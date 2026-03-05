import React, { useCallback, useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Loader2, Play, AlertCircle, Camera, RefreshCw } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

const VideoUpload = ({ label, onUpload, onScreenshot, currentVideo, hasImage, className = "" }) => {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(currentVideo);
    const [error, setError] = useState(null);
    const [screenshotTime, setScreenshotTime] = useState(81); // 1m21s par défaut
    const videoRef = useRef(null);

    const captureScreenshot = (videoUrl, targetTime) => {
        return new Promise((resolve) => {
            const video = document.createElement('video');
            video.src = videoUrl;
            video.crossOrigin = 'anonymous';
            video.muted = true;

            const time = parseFloat(targetTime) || 81;

            video.onloadedmetadata = () => {
                // Si la vidéo est plus courte que le temps demandé, on prend à 1s
                if (video.duration >= time) {
                    video.currentTime = time;
                } else {
                    video.currentTime = Math.min(1, video.duration);
                }
            };

            video.onseeked = () => {
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                canvas.toBlob(async (blob) => {
                    if (!blob) {
                        resolve(null);
                        return;
                    }
                    const file = new File([blob], "thumbnail.jpg", { type: "image/jpeg" });
                    const fileName = `thumb-${crypto.randomUUID()}.jpg`;
                    const filePath = `public/${fileName}`;

                    const { error: uploadError } = await supabase.storage
                        .from('images')
                        .upload(filePath, file);

                    if (!uploadError) {
                        const { data } = supabase.storage.from('images').getPublicUrl(filePath);
                        resolve(data.publicUrl);
                    } else {
                        resolve(null);
                    }
                }, 'image/jpeg', 0.8);
            };

            video.onerror = () => resolve(null);
        });
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}m ${s}s`;
    };

    const handleRecapture = async () => {
        if (!preview) return;
        toast.loading(`Nouvelle capture à ${formatTime(screenshotTime)}...`, { id: 'screenshot-loader' });
        const screenshotUrl = await captureScreenshot(preview, screenshotTime);
        if (screenshotUrl) {
            onScreenshot(screenshotUrl);
            toast.success(`Image mise à jour à ${formatTime(screenshotTime)}`, { id: 'screenshot-loader' });
        } else {
            toast.error("Échec de la capture", { id: 'screenshot-loader' });
        }
    };

    const onDrop = useCallback(async (acceptedFiles) => {
        if (!acceptedFiles || acceptedFiles.length === 0) return;

        const file = acceptedFiles[0];

        if (file.size > 50 * 1024 * 1024) {
            toast.error("La vidéo est trop lourde (max 50MB). Veuillez la compresser.");
            return;
        }

        setUploading(true);
        setError(null);

        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${crypto.randomUUID()}.${fileExt}`;
            const filePath = `news/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('videos')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from('videos').getPublicUrl(filePath);
            const publicUrl = data.publicUrl;

            setPreview(publicUrl);
            onUpload(publicUrl);

            // AUTO-SCREENSHOT : Uniquement si aucune image n'est déjà présente
            if (!hasImage && onScreenshot) {
                toast.loading(`Génération de l'image (${formatTime(screenshotTime)})...`, { id: 'screenshot-loader' });
                const screenshotUrl = await captureScreenshot(publicUrl, screenshotTime);
                if (screenshotUrl) {
                    onScreenshot(screenshotUrl);
                    toast.success(`Image générée automatiquement à ${formatTime(screenshotTime)}`, { id: 'screenshot-loader' });
                } else {
                    toast.dismiss('screenshot-loader');
                }
            }

            toast.success("Vidéo téléchargée avec succès");
        } catch (error) {
            console.error('Error uploading video:', error);
            setError(error.message);
            toast.error(error.message || "Erreur lors du téléchargement");
        } finally {
            setUploading(false);
        }
    }, [onUpload, onScreenshot, hasImage, screenshotTime]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'video/*': ['.mp4', '.webm', '.ogg', '.mov']
        },
        multiple: false
    });

    return (
        <div className={className}>
            {preview && (
                <div className="mb-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col">
                                <label htmlFor="video-minutes" className="text-xs font-black uppercase text-slate-400 mb-1">Minutes</label>
                                <input
                                    id="video-minutes"
                                    type="number"
                                    min="0"
                                    aria-label="Minutes de la capture d'écran"
                                    value={Math.floor(screenshotTime / 60)}
                                    onChange={(e) => {
                                        const val = parseInt(e.target.value, 10) || 0;
                                        const currentSec = screenshotTime % 60;
                                        const newTime = val * 60 + currentSec;
                                        setScreenshotTime(newTime);
                                        if (videoRef.current) videoRef.current.currentTime = newTime;
                                    }}
                                    className="w-20 bg-white border-2 border-slate-200 rounded-xl px-2 py-3 text-center text-2xl font-black text-slate-700 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                                />
                            </div>
                            <span className="text-2xl font-black text-slate-300 mt-5">:</span>
                            <div className="flex flex-col">
                                <label htmlFor="video-seconds" className="text-xs font-black uppercase text-slate-400 mb-1">Secondes</label>
                                <input
                                    id="video-seconds"
                                    type="number"
                                    min="0"
                                    max="59"
                                    aria-label="Secondes de la capture d'écran"
                                    value={screenshotTime % 60}
                                    onChange={(e) => {
                                        const val = parseInt(e.target.value, 10) || 0;
                                        const currentMin = Math.floor(screenshotTime / 60);
                                        const newTime = currentMin * 60 + val;
                                        setScreenshotTime(newTime);
                                        if (videoRef.current) videoRef.current.currentTime = newTime;
                                    }}
                                    className="w-20 bg-white border-2 border-slate-200 rounded-xl px-2 py-3 text-center text-2xl font-black text-slate-700 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    if (videoRef.current) {
                                        const currentTime = Math.floor(videoRef.current.currentTime);
                                        setScreenshotTime(currentTime);
                                        toast.success(`Temps synchronisé : ${formatTime(currentTime)}`);
                                    }
                                }}
                                className="flex items-center gap-2 px-4 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-100 font-bold transition-all shadow-sm"
                            >
                                <RefreshCw size={18} />
                                <span className="text-xs uppercase tracking-wider">Utiliser ce moment</span>
                            </button>

                            <button
                                type="button"
                                onClick={handleRecapture}
                                className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark shadow-lg shadow-primary/20 font-black uppercase text-xs tracking-widest transition-all transform hover:scale-105"
                            >
                                <Camera size={18} />
                                Capturer l'image
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {preview && (
                <div className="relative mb-6 rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl aspect-video bg-slate-900 group">
                    {/* Blurred Background */}
                    <video
                        src={preview}
                        className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-30 scale-110"
                        muted
                    />

                    <div className="relative z-10 w-full h-full flex justify-center bg-black/40 backdrop-blur-sm">
                        <video
                            ref={videoRef}
                            src={preview}
                            className="h-full w-auto object-contain shadow-2xl"
                            controls
                            crossOrigin="anonymous"
                        />
                    </div>

                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            setPreview(null);
                            onUpload('');
                        }}
                        className="absolute top-4 right-4 bg-white/90 p-3 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110 z-20 shadow-xl"
                    >
                        <X size={20} />
                    </button>
                </div>
            )}

            <div
                {...getRootProps()}
                className={`
                    border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all
                    ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/50 hover:bg-gray-50'}
                    ${uploading ? 'pointer-events-none opacity-50' : ''}
                    ${error ? 'border-red-300 bg-red-50' : ''}
                `}
            >
                <input {...getInputProps()} aria-label={label || "Télécharger une vidéo"} />
                {uploading ? (
                    <div className="flex flex-col items-center gap-3">
                        <Loader2 className="animate-spin text-primary" size={24} />
                        <p className="text-sm font-medium text-gray-500">Téléchargement et optimisation...</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                            <Upload size={24} />
                        </div>
                        <div>
                            <p className="font-bold text-gray-700">
                                {isDragActive ? 'Déposez la vidéo ici' : 'Cliquez ou glissez une vidéo ici'}
                            </p>
                            <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-black">MP4, WEBM (Max 50MB)</p>
                            <div className="mt-2 flex items-center justify-center gap-1 text-[10px] text-amber-600 font-bold">
                                <AlertCircle size={12} />
                                Utilisez des vidéos compressées pour économiser l'espace
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {error && (
                <p className="mt-2 text-xs text-red-500 font-medium">{error}</p>
            )}
        </div>
    );
};

export default VideoUpload;

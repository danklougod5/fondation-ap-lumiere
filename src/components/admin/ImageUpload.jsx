import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const ImageUpload = ({ label, onUpload, currentImage, multiple = false, className = "" }) => {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(currentImage);

    // If multiple, preview works differently (handled by parent usually, but here we can show last uploaded or list)
    // For this specific component, I'll design it to return the URL(s) to the parent.
    // However, if multiple=true, this component typically handles *adding* to a list. 
    // Let's keep it simple: It uploads and calls onUpload(url).

    const onDrop = useCallback(async (acceptedFiles) => {
        if (!acceptedFiles || acceptedFiles.length === 0) return;

        setUploading(true);
        try {
            const uploadPromises = acceptedFiles.map(async (file) => {
                const fileExt = file.name.split('.').pop();
                const fileName = `${crypto.randomUUID()}.${fileExt}`;
                const filePath = `public/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('images') // Ensure this bucket exists or use 'public'
                    .upload(filePath, file);

                if (uploadError) throw uploadError;

                const { data } = supabase.storage.from('images').getPublicUrl(filePath);
                return data.publicUrl;
            });

            const urls = await Promise.all(uploadPromises);

            if (multiple) {
                onUpload(urls); // Parent receives array of new URLs
            } else {
                const url = urls[0];
                setPreview(url);
                onUpload(url);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Erreur lors du téléchargement de l\'image. Vérifiez que le bucket "images" existe dans Supabase Storage et est public.');
        } finally {
            setUploading(false);
        }
    }, [multiple, onUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.png', '.jpg', '.webp']
        },
        multiple: multiple
    });

    return (
        <div className={className}>
            <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>

            {!multiple && preview && (
                <div className="relative mb-4 rounded-xl overflow-hidden border border-gray-200 aspect-video group">
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            setPreview(null);
                            onUpload(null);
                        }}
                        className="absolute top-2 right-2 bg-white/90 p-2 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                    >
                        <X size={16} />
                    </button>
                </div>
            )}

            <div
                {...getRootProps()}
                className={`
                    border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all
                    ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/50 hover:bg-gray-50'}
                    ${uploading ? 'pointer-events-none opacity-50' : ''}
                `}
            >
                <input {...getInputProps()} aria-label={label || "Télécharger une image"} />
                {uploading ? (
                    <div className="flex flex-col items-center gap-3">
                        <Loader2 className="animate-spin text-primary" size={24} />
                        <p className="text-sm font-medium text-gray-500">Téléchargement en cours...</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                            {multiple ? <ImageIcon className="text-primary" size={24} /> : <Upload className="text-primary" size={24} />}
                        </div>
                        <div>
                            <p className="font-bold text-gray-700">
                                {isDragActive ? 'Déposez les fichiers ici' : 'Cliquez ou glissez une image ici'}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP jusqu'à 5MB</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageUpload;

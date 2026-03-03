import React from 'react';
import { X } from 'lucide-react';
import ImageUpload from '../ImageUpload';

const NewsMediaSection = ({
    formData,
    handleImageUpload,
    handleAdditionalImagesUpload,
    removeAdditionalImage
}) => {
    return (
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 space-y-8">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4">Médias</h2>

            <div>
                <ImageUpload
                    label="Image Principale"
                    currentImage={formData.image_url}
                    onUpload={handleImageUpload}
                />
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-4">Galerie d'Images</label>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {formData.additional_images.map((img) => (
                        <div key={img} className="relative group aspect-square rounded-xl overflow-hidden border border-gray-200">
                            <img src={img} alt="" className="w-full h-full object-cover" />
                            <button
                                type="button"
                                onClick={() => removeAdditionalImage(formData.additional_images.indexOf(img))}
                                className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                </div>

                <ImageUpload
                    label={formData.additional_images.length > 0 ? "Ajouter d'autres photos" : "Ajouter des photos"}
                    multiple={true}
                    onUpload={handleAdditionalImagesUpload}
                />
            </div>
        </div>
    );
};

export default NewsMediaSection;

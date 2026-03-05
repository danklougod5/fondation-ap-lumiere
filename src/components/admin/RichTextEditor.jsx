import React from 'react';
import DOMPurify from 'dompurify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const RichTextEditor = ({ value, onChange, label, placeholder }) => {
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'list', 'bullet',
        'link'
    ];

    return (
        <div className="space-y-2">
            {label && <label className="text-sm font-bold text-gray-700 ml-1">{label}</label>}
            <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={onChange}
                    modules={modules}
                    formats={formats}
                    placeholder={placeholder}
                    className="bg-white"
                />
            </div>
            <style dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(`
                .ql-toolbar.ql-snow {
                    border: none !important;
                    background: #f9fafb !important;
                    border-bottom: 1px solid #e5e7eb !important;
                    padding: 12px !important;
                }
                .ql-container.ql-snow {
                    border: none !important;
                    font-family: 'Inter', sans-serif !important;
                    font-size: 16px !important;
                    min-height: 200px;
                }
                .ql-editor {
                    padding: 20px !important;
                }
                .ql-editor.ql-blank::before {
                    left: 20px !important;
                    color: #9ca3af !important;
                    font-style: normal !important;
                }
            `)
            }} />
        </div>
    );
};

export default RichTextEditor;

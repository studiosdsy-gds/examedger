
import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, FileText, Upload, Download, Trash2, ArrowRight, Zap, ShieldCheck, 
  Layers, Sun, Maximize, Edit3, UserCheck, Merge, Type, Image as ImageIcon, 
  FileOutput, FileInput, Sliders, AlignLeft, Scissors, Calendar, PenTool
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SignatureCanvas from 'react-signature-canvas';
import { supabase } from '../src/services/supabaseClient';
import { useLoading } from '../src/context/LoadingContext';

type PhotoSubTab = 'bg-remover' | 'relight' | 'upscale' | 'editor' | 'face-enhance' | 'date-stamper';
type PdfSubTab = 'merge' | 'pdf-to-text' | 'img-to-pdf' | 'pdf-to-other' | 'other-to-pdf' | 'compress' | 'text-to-pdf' | 'edit' | 'signature';

// --- Sub-components (Hoisted) ---

const RangeSetting = ({ label }: { label: string }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-blue/40 dark:text-denim/40">
      <span>{label}</span>
      <span>75%</span>
    </div>
    <input type="range" className="w-full h-1 bg-slate-blue/10 dark:bg-eggshell/10 rounded-full appearance-none accent-ink dark:accent-eggshell" />
  </div>
);

const ToolSettings = ({ type, subTab }: { type: 'photo' | 'pdf', subTab: string }) => {
  if (type === 'photo') {
    switch (subTab) {
      case 'relight':
        return (
          <div className="space-y-4">
             <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-slate-blue/40 dark:text-denim/40">Light Source</label>
               <div className="grid grid-cols-2 gap-2">
                  {['Soft Morning', 'Direct Noon', 'Studio Left', 'Golden Hour'].map(l => (
                    <button key={l} className="p-2 text-[10px] font-black border border-slate-blue/10 dark:border-slate-blue/20 rounded-lg hover:border-ink dark:hover:border-eggshell transition-colors text-slate-blue dark:text-denim">{l}</button>
                  ))}
               </div>
             </div>
             <RangeSetting label="Intensity" />
          </div>
        );
      case 'upscale':
        return (
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-blue/40 dark:text-denim/40">Target Resolution</label>
            <div className="grid grid-cols-3 gap-2">
              {['2x (Standard)', '4x (Ultra)', '8x (Extreme)'].map(r => (
                <button key={r} className="p-2 text-[10px] font-black border border-slate-blue/10 dark:border-slate-blue/20 rounded-lg text-slate-blue dark:text-denim">{r}</button>
              ))}
            </div>
          </div>
        );
      case 'face-enhance':
        return (
           <div className="space-y-4">
             <RangeSetting label="Denoise Strength" />
             <RangeSetting label="Detail Recovery" />
           </div>
        );
      case 'date-stamper':
        return (
            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-blue/40 dark:text-denim/40">Date Format</label>
                    <select className="w-full bg-eggshell/20 dark:bg-ink border border-slate-blue/10 dark:border-slate-blue/20 rounded-lg p-2 text-xs font-bold text-ink dark:text-eggshell">
                        <option>DD/MM/YYYY</option>
                        <option>MM/DD/YYYY</option>
                        <option>YYYY-MM-DD</option>
                    </select>
                </div>
            </div>
        );
      default:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-blue/40 dark:text-denim/40">Preset Dimensions</label>
              <select className="w-full bg-eggshell/20 dark:bg-ink border border-slate-blue/10 dark:border-slate-blue/20 rounded-xl px-4 py-3 text-xs font-bold outline-none focus:border-slate-blue dark:focus:border-denim text-ink dark:text-eggshell">
                <option>Custom (px)</option>
                <option>JEE Main Photo (3.5x4.5cm)</option>
                <option>NEET UG Postcard (4x6in)</option>
                <option>UPSC CSE Photo (3.5x4.5cm)</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-blue/40 dark:text-denim/40">Width</label>
                <input type="number" placeholder="450" className="w-full bg-eggshell/20 dark:bg-ink border border-slate-blue/10 dark:border-slate-blue/20 rounded-lg p-2 text-xs font-bold text-ink dark:text-eggshell" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-blue/40 dark:text-denim/40">Height</label>
                <input type="number" placeholder="600" className="w-full bg-eggshell/20 dark:bg-ink border border-slate-blue/10 dark:border-slate-blue/20 rounded-lg p-2 text-xs font-bold text-ink dark:text-eggshell" />
              </div>
            </div>
          </div>
        );
    }
  }

  // PDF Settings
  switch (subTab) {
    case 'compress':
      return (
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-blue/40 dark:text-denim/40">Compression Level</label>
          <div className="space-y-2">
             {['Minimum (Lossless)', 'Recommended', 'Maximum (Low Quality)'].map(lvl => (
               <button key={lvl} className="w-full text-left p-3 text-xs font-black border border-slate-blue/10 dark:border-slate-blue/20 rounded-xl hover:border-ink dark:hover:border-eggshell transition-all text-slate-blue dark:text-denim">{lvl}</button>
             ))}
          </div>
        </div>
      );
    case 'pdf-to-other':
      return (
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-blue/40 dark:text-denim/40">Target Format</label>
          <div className="grid grid-cols-2 gap-2">
             {['DOCX (Word)', 'PPTX', 'TXT', 'HTML'].map(f => (
               <button key={f} className="p-3 text-[10px] font-black border border-slate-blue/10 dark:border-slate-blue/20 rounded-xl text-slate-blue dark:text-denim">{f}</button>
             ))}
          </div>
        </div>
      );
    case 'img-to-pdf':
      return (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-[10px] font-black text-slate-blue/40 dark:text-denim/40">
            <span>PAGE MARGINS</span>
            <span>5mm</span>
          </div>
          <input type="range" className="w-full h-1 bg-slate-blue/10 dark:bg-eggshell/10 rounded-full appearance-none accent-ink dark:accent-eggshell" />
        </div>
      );
    case 'signature':
        return (
            <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-blue/40 dark:text-denim/40">Pen Color</label>
                <div className="flex gap-2">
                    {['#000', '#0000FF', '#FF0000'].map(c => (
                        <button key={c} className="w-6 h-6 rounded-full border border-black/10" style={{ backgroundColor: c }} />
                    ))}
                </div>
            </div>
        );
    default:
      return (
        <div className="p-4 bg-slate-blue/5 dark:bg-ink rounded-xl border border-slate-blue/10 dark:border-slate-blue/20 shadow-sm">
          <p className="text-[10px] font-black text-slate-blue/40 dark:text-denim/40">Settings will activate once file is uploaded.</p>
        </div>
      );
  }
};

const ToolInterface = ({ type, subTab, file, onFileChange, sigCanvasRef }: { type: 'photo' | 'pdf', subTab: string, file: File | null, onFileChange: (f: File | null) => void, sigCanvasRef?: any }) => {
  const cameraInputRef = useRef<HTMLInputElement>(null);

  if (subTab === 'text-to-pdf') {
    return (
      <div className="flex-1 flex flex-col gap-4">
        <h3 className="text-xl font-black text-ink dark:text-eggshell">Draft Content</h3>
        <textarea 
          placeholder="Type or paste your text here to convert it into a formatted PDF document..."
          className="flex-1 w-full bg-eggshell/20 dark:bg-ink/40 border border-slate-blue/10 dark:border-slate-blue/20 rounded-xl p-6 outline-none focus:border-slate-blue dark:focus:border-denim font-bold text-sm text-ink dark:text-eggshell resize-none"
        />
      </div>
    );
  }

  if (subTab === 'edit' && type === 'pdf') {
     return (
       <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
         <div className="size-20 bg-slate-blue/5 dark:bg-ink rounded-2xl flex items-center justify-center border border-slate-blue/10 dark:border-slate-blue/20"><Scissors size={40} className="text-slate-blue dark:text-denim opacity-20" /></div>
         <div className="max-w-xs">
           <h3 className="text-xl font-black text-ink dark:text-eggshell">PDF Text Editor</h3>
           <p className="text-sm text-slate-blue dark:text-denim font-bold">Upload a PDF to enable inline text editing. No re-formatting required.</p>
         </div>
         <button onClick={() => document.getElementById('tool-upload')?.click()} className="px-8 py-3 bg-ink dark:bg-eggshell text-eggshell dark:text-ink rounded-xl font-black text-xs uppercase tracking-widest shadow-lg">Select PDF</button>
         <input id="tool-upload" type="file" className="hidden" onChange={(e) => onFileChange(e.target.files?.[0] || null)} />
       </div>
     );
  }

  if (subTab === 'signature') {
      return (
        <div className="flex-1 flex flex-col w-full h-full relative p-4">
            <h3 className="text-xl font-black text-ink dark:text-eggshell mb-4 text-center">Digital Signature Pad</h3>
            <div className="flex-1 bg-white border-2 border-dashed border-slate-blue/20 rounded-xl overflow-hidden relative shadow-inner min-h-[300px]">
                <SignatureCanvas 
                    ref={sigCanvasRef}
                    penColor="black"
                    canvasProps={{className: 'w-full h-full'}} 
                />
            </div>
            <div className="flex justify-between items-center mt-4 gap-4">
                <button 
                  onClick={() => sigCanvasRef?.current?.clear()} 
                  className="px-6 py-2 bg-red-50 text-red-600 rounded-lg text-xs font-black uppercase"
                >
                    Clear
                </button>
                <div className="text-[10px] font-bold text-slate-blue/60">
                    Output: PNG (Max 20KB)
                </div>
            </div>
        </div>
      );
  }

  if (subTab === 'date-stamper') {
      return (
          <div className="flex-1 flex flex-col gap-4 items-center justify-center">
             {file ? (
                 <div className="relative max-w-sm border border-slate-blue/10 rounded-lg overflow-hidden">
                     <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-auto" />
                     <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-sm px-2 py-1 text-xs font-black text-white rounded">
                         {new Date().toLocaleDateString()}
                     </div>
                 </div>
             ) : (
                <div className="text-center">
                    <p className="font-bold text-slate-blue dark:text-denim mb-4">Upload a photo to stamp</p>
                    <button onClick={() => document.getElementById('tool-upload')?.click()} className="px-6 py-2 bg-ink dark:bg-eggshell text-eggshell dark:text-ink rounded-lg text-xs font-black uppercase">Upload Photo</button>
                </div>
             )}
             <input id="tool-upload" type="file" className="hidden" onChange={(e) => onFileChange(e.target.files?.[0] || null)} />
          </div>
      );
  }

  return (
    <div className="flex-1 border-2 border-dashed border-slate-blue/5 dark:border-slate-blue/10 rounded-xl flex flex-col items-center justify-center p-6 md:p-12 text-center group hover:bg-slate-blue/5 dark:hover:bg-ink/40 hover:border-slate-blue/20 dark:hover:border-denim/20 transition-all cursor-pointer relative">
      <input 
        id="tool-upload" 
        type="file" 
        className="hidden" 
        onChange={(e) => onFileChange(e.target.files?.[0] || null)} 
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => onFileChange(e.target.files?.[0] || null)}
      />
      
      {file ? (
        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
          <div className="size-24 bg-slate-blue/5 dark:bg-ink/60 rounded-2xl flex items-center justify-center mx-auto shadow-sm border border-slate-blue/10 dark:border-slate-blue/20 text-slate-blue dark:text-denim">
            {type === 'photo' ? <Camera size={40} strokeWidth={1.5} /> : <FileText size={40} strokeWidth={1.5} />}
          </div>
          <div>
            <h3 className="text-xl font-black text-ink dark:text-eggshell">{file.name}</h3>
            <p className="text-xs text-slate-blue/40 dark:text-denim/40 font-black uppercase tracking-widest mt-1">{(file.size / 1024).toFixed(2)} KB • Ready for {subTab.replace('-', ' ')}</p>
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); onFileChange(null); }}
            className="px-6 py-2 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors"
          >
            <Trash2 size={12} className="inline mr-1" /> Clear File
          </button>
        </div>
      ) : (
        <div className="space-y-6 w-full">
          <div className="size-16 bg-slate-blue/5 dark:bg-ink rounded-xl flex items-center justify-center mx-auto text-slate-blue/20 dark:text-denim/20 group-hover:text-ink dark:group-hover:text-eggshell transition-colors duration-200" onClick={() => document.getElementById('tool-upload')?.click()}>
            <Upload size={32} strokeWidth={2} />
          </div>
          <div>
            <h3 className="text-lg font-black text-ink dark:text-eggshell hidden md:block">Drop your {type === 'photo' ? 'Image' : 'PDF'} here</h3>
            <p className="text-xs text-slate-blue/40 dark:text-denim/40 font-bold mt-1 hidden md:block">Maximum file size: 25MB • Local processing only</p>
          </div>
          <div className="flex flex-col md:flex-row gap-3 justify-center w-full md:w-auto">
            <button 
              onClick={(e) => { e.stopPropagation(); document.getElementById('tool-upload')?.click(); }}
              className="px-8 py-3 bg-slate-blue/5 dark:bg-ink rounded-xl font-black text-xs uppercase tracking-widest group-hover:bg-ink dark:group-hover:bg-eggshell group-hover:text-eggshell dark:group-hover:text-ink transition-all shadow-sm w-full md:w-auto"
            >
              Browse Files
            </button>
            {type === 'photo' && (
              <button
                onClick={(e) => { e.stopPropagation(); cameraInputRef.current?.click(); }}
                className="px-8 py-3 bg-ink dark:bg-eggshell text-eggshell dark:text-ink rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-sm w-full md:w-auto md:hidden flex items-center justify-center gap-2"
              >
                <Camera size={14} /> Take Photo
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// --- Main Page Component ---

const ToolPage: React.FC<{ type: 'photo' | 'pdf'; initialFile?: File | null; onFileProcessed?: () => void }> = ({ type, initialFile, onFileProcessed }) => {
  const [file, setFile] = useState<File | null>(null);
  const [photoTab, setPhotoTab] = useState<PhotoSubTab>('editor');
  const [pdfTab, setPdfTab] = useState<PdfSubTab>('merge');
  const [isStorageOptIn, setIsStorageOptIn] = useState(false);
  const sigCanvasRef = useRef<any>(null);
  const { setIsLoading } = useLoading();

  useEffect(() => {
    if (initialFile) {
      setFile(initialFile);
      if (type === 'photo') setPhotoTab('editor');
      if (onFileProcessed) onFileProcessed();
    }
  }, [initialFile, type, onFileProcessed]);

  const photoTabs = [
    { id: 'bg-remover', label: 'BG Remover', icon: Layers },
    { id: 'relight', label: 'Photo Relight', icon: Sun },
    { id: 'upscale', label: 'Upscaler', icon: Maximize },
    { id: 'editor', label: 'Editor', icon: Edit3 },
    { id: 'face-enhance', label: 'Face Enhancer', icon: UserCheck },
    { id: 'date-stamper', label: 'Date Stamper', icon: Calendar },
  ];

  const pdfTabs = [
    { id: 'merge', label: 'Merge PDF', icon: Merge },
    { id: 'pdf-to-text', label: 'PDF to Text', icon: Type },
    { id: 'signature', label: 'Signature Pad', icon: PenTool },
    { id: 'img-to-pdf', label: 'Img to PDF', icon: ImageIcon },
    { id: 'pdf-to-other', label: 'PDF to Docx', icon: FileOutput },
    { id: 'other-to-pdf', label: 'Other to PDF', icon: FileInput },
    { id: 'compress', label: 'Compressor', icon: Sliders },
    { id: 'text-to-pdf', label: 'Text to PDF', icon: AlignLeft },
    { id: 'edit', label: 'Edit PDF', icon: Scissors },
  ];

  const currentTabs = type === 'photo' ? photoTabs : pdfTabs;
  // @ts-ignore - dynamic tab typing
  const currentSubTab = type === 'photo' ? photoTab : pdfTab;
  
  const setSubTab = (id: string) => {
    if (type === 'photo') setPhotoTab(id as PhotoSubTab);
    else setPdfTab(id as PdfSubTab);
  };

  // Helper for Upload
  const uploadUserAsset = async (blob: Blob, fileName: string) => {
      try {
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) return; 
          const path = `${user.id}/${Date.now()}_${fileName}`;
          const { error: uploadError } = await supabase.storage.from('user_assets').upload(path, blob);
          if (uploadError) throw uploadError;
          
          const { data: { publicUrl } } = supabase.storage.from('user_assets').getPublicUrl(path);
          await supabase.from('user_assets').insert({
              user_id: user.id,
              asset_url: publicUrl,
              asset_type: fileName.endsWith('pdf') ? 'pdf' : 'image', // Simplified type
              storage_path: path,
              created_at: new Date().toISOString()
          });
      } catch (e) {
          console.error("Upload failed", e);
      }
  };

  const handleExecute = async () => {
      setIsLoading(true);
      try {
      if (type === 'photo' && photoTab === 'date-stamper' && file) {
          const img = new Image();
          img.src = URL.createObjectURL(file);
          await new Promise((resolve) => { img.onload = resolve; });
          
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (!ctx) return;
          
          ctx.drawImage(img, 0, 0);
          
          // Style for Stamp
          const fontSize = Math.max(20, img.width * 0.04); // Responsive font size
          ctx.font = `bold ${fontSize}px sans-serif`;
          ctx.fillStyle = 'red'; // Classic date stamp color
          ctx.textAlign = 'right';
          ctx.textBaseline = 'bottom';
          
          const dateStr = new Date().toLocaleDateString();
          const padding = fontSize;
          
          // Draw text with background for readability? Or just text. 
          // Classic digital camera stamp is reddish-orange
          ctx.fillStyle = '#ff3300';
          ctx.fillText(dateStr, canvas.width - padding, canvas.height - padding);
          
          canvas.toBlob(async (blob) => {
              if (!blob) return;
              if (isStorageOptIn) await uploadUserAsset(blob, 'stamped_photo.png');
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `stamped_${file.name}`;
              a.click();
          }, 'image/png');
      }

      if (type === 'pdf' && pdfTab === 'signature') {
          // @ts-ignore
          const canvas = sigCanvasRef.current?.getTrimmedCanvas();
          if (!canvas) return;
          
          canvas.toBlob(async (blob: Blob) => {
              if (blob.size > 20 * 1024) {
                 alert("Signature too large (>20KB). Try drawing smaller or simpler.");
                 return;
              }
              if (isStorageOptIn) await uploadUserAsset(blob, 'signature.png');
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'signature.png';
              a.click();
          }, 'image/png');
      }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
      // ... Add other handlers here if needed
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tighter text-ink dark:text-eggshell uppercase notranslate">
            {type === 'photo' ? 'Photo Studio' : 'PDF Toolset'}
          </h2>
          <p className="text-slate-blue dark:text-denim mt-1 font-bold">
            Professional tools optimized for exam documentation.
          </p>
        </div>
      </div>

      {/* Sub-Tabs Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <div className="flex bg-slate-blue/5 dark:bg-space p-1 rounded-huge border border-slate-blue/10 dark:border-slate-blue/20 shrink-0 shadow-sm">
          {currentTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black transition-all duration-200 whitespace-nowrap ${
                currentSubTab === tab.id 
                ? 'bg-ink dark:bg-eggshell text-eggshell dark:text-ink shadow-sm' 
                : 'text-slate-blue dark:text-denim hover:text-ink dark:hover:text-eggshell'
              }`}
            >
              <tab.icon size={14} strokeWidth={2.5} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Work Area */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSubTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-space/40 border border-slate-blue/10 dark:border-slate-blue/20 rounded-huge p-8 min-h-[500px] flex flex-col shadow-sm"
            >
              <ToolInterface 
                type={type} 
                subTab={currentSubTab} 
                file={file} 
                onFileChange={setFile}
                sigCanvasRef={sigCanvasRef}
              />
            </motion.div>
          </AnimatePresence>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 bg-white dark:bg-space/40 rounded-huge border border-slate-blue/10 dark:border-slate-blue/20 shadow-sm">
              <Zap className="size-6 mb-3 text-slate-blue dark:text-denim opacity-40" />
              <h4 className="font-black text-sm mb-1 text-ink dark:text-eggshell">Instant Processing</h4>
              <p className="text-xs text-slate-blue dark:text-denim font-bold">Most tasks are completed in under 2 seconds using edge computation.</p>
            </div>
            <div className="p-6 bg-white dark:bg-space/40 rounded-huge border border-slate-blue/10 dark:border-slate-blue/20 shadow-sm">
              <ShieldCheck className="size-6 mb-3 text-slate-blue dark:text-denim opacity-40" />
              <h4 className="font-black text-sm mb-1 text-ink dark:text-eggshell">Zero Server Storage</h4>
              <p className="text-xs text-slate-blue dark:text-denim font-bold">Your files never leave your browser for maximum privacy.</p>
            </div>
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-space/40 p-8 rounded-huge border border-slate-blue/10 dark:border-slate-blue/20 shadow-sm">
            <h3 className="text-lg font-black mb-6 text-ink dark:text-eggshell">Task Settings</h3>
            <div className="space-y-4">
              <ToolSettings type={type} subTab={currentSubTab} />
              
              <div className="p-4 bg-slate-blue/5 dark:bg-ink rounded-xl border border-slate-blue/10 dark:border-slate-blue/20">
                  <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={isStorageOptIn} 
                        onChange={(e) => setIsStorageOptIn(e.target.checked)}
                        className="w-4 h-4 rounded border-slate-blue/20 text-ink focus:ring-slate-blue" 
                      />
                      <div className="text-xs font-bold text-ink dark:text-eggshell">
                          Save to My Storage
                          <p className="text-[10px] opacity-60 font-normal">Auto-save generated files to your cloud.</p>
                      </div>
                  </label>
              </div>

              <button 
                onClick={handleExecute}
                disabled={!file && currentSubTab !== 'text-to-pdf' && currentSubTab !== 'signature'}
                className="w-full py-4 bg-ink dark:bg-eggshell text-eggshell dark:text-ink rounded-xl font-black flex items-center justify-center gap-2 hover-fast active:scale-95 shadow-xl disabled:opacity-20 disabled:pointer-events-none mt-4"
              >
                Execute Action <Download size={18} />
              </button>
            </div>
          </div>

          <div className="p-6 bg-space dark:bg-eggshell text-eggshell dark:text-ink rounded-huge border border-slate-blue/10 dark:border-slate-blue/20 shadow-lg shadow-ink/10">
            <h4 className="font-black text-sm mb-2">Pro Aspirant Tip</h4>
            <p className="text-xs opacity-60 leading-relaxed font-bold">
              {type === 'photo' 
                ? 'Check specific exam notices for DPI requirements. UPSC usually prefers 300 DPI for scans.'
                : 'Merge all your semester marksheet into one PDF for faster verification on GATE/NET portals.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolPage;

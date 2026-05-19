import { useState } from 'react';
import { TopBar } from '../studio/TopBar';
import { motion } from 'motion/react';

type ElementType = 'text' | 'score' | 'timer' | 'box' | 'image';

interface OverlayElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  width: number | string;
  height: number | string;
  content?: string;
  color?: string;
  bgColor?: string;
  fontSize?: number;
  fontFamily?: string;
  opacity?: number;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  shadow?: string;
}

interface OverlayTemplate {
  id: string;
  name: string;
  category: string;
  elements: OverlayElement[];
}

export function OverlayBuilder() {
  const [elements, setElements] = useState<OverlayElement[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [templates, setTemplates] = useState<OverlayTemplate[]>([
    {
       id: '1',
       name: 'FOOTBALL V1',
       category: 'Sports',
       elements: [
         { id: 't1', type: 'box', x: 100, y: 100, width: 300, height: 60, bgColor: 'rgba(0,0,0,0.8)', color: '#fff', opacity: 1, borderRadius: 8, borderWidth: 0, borderColor: '#fff' },
         { id: 't2', type: 'text', x: 120, y: 120, width: 'auto', height: 'auto', content: 'HOME 0 - 0 AWAY', color: '#00F5FF', fontSize: 24, bgColor: 'transparent', opacity: 1, borderRadius: 0, borderWidth: 0, borderColor: '#fff' }
       ]
    }
  ]);
  const [saveName, setSaveName] = useState('');
  const [saveCategory, setSaveCategory] = useState('Sports');

  const addElement = (type: ElementType) => {
    const newEl: OverlayElement = {
      id: Date.now().toString(),
      type,
      x: 100,
      y: 100,
      width: type === 'box' || type === 'image' ? 200 : 'auto',
      height: type === 'box' || type === 'image' ? 100 : 'auto',
      content: type === 'text' ? 'New Text' : type === 'score' ? '0 - 0' : type === 'timer' ? '45:00' : type === 'image' ? 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=200&auto=format&fit=crop' : '',
      color: '#FFFFFF',
      bgColor: type === 'box' ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
      fontSize: 24,
      fontFamily: 'Inter',
      opacity: 1,
      borderRadius: 0,
      borderWidth: 0,
      borderColor: '#FFFFFF',
      shadow: 'none'
    };
    setElements([...elements, newEl]);
    setSelectedId(newEl.id);
  };

  const updateElement = (id: string, updates: Partial<OverlayElement>) => {
    setElements(elements.map(el => el.id === id ? { ...el, ...updates } : el));
  };

  const saveTemplate = () => {
    if (!saveName) return;
    const newTemplate: OverlayTemplate = {
      id: Date.now().toString(),
      name: saveName.toUpperCase(),
      category: saveCategory,
      elements: [...elements]
    };
    setTemplates([...templates, newTemplate]);
    setSaveName('');
  };

  const loadTemplate = (tmpl: OverlayTemplate) => {
    setElements([...tmpl.elements.map(el => ({...el}))]);
    setSelectedId(null);
  };

  const selectedEl = elements.find(el => el.id === selectedId);

  return (
    <div className="w-screen h-screen flex flex-col bg-[#0A0B0E] p-4 text-[#E0E0E0] overflow-hidden">
      <TopBar />
      
      <main className="flex-1 grid grid-cols-12 gap-4 overflow-hidden pt-2">
        {/* Left Toolbar */}
        <section className="col-span-2 flex flex-col gap-3 overflow-hidden h-full">
           <div className="glass rounded-xl p-4 flex flex-col gap-4 h-full">
              <h3 className="text-[10px] font-bold text-gray-500 uppercase">Add Elements</h3>
              <div className="grid grid-cols-2 gap-2">
                 <button onClick={() => addElement('text')} className="p-3 rounded glass hover:bg-white/5 flex flex-col items-center gap-2">
                   <span className="material-symbols-outlined text-cyan-400">text_fields</span>
                   <span className="text-[9px] uppercase font-bold text-gray-400">Text</span>
                 </button>
                 <button onClick={() => addElement('score')} className="p-3 rounded glass hover:bg-white/5 flex flex-col items-center gap-2">
                   <span className="material-symbols-outlined text-cyan-400">scoreboard</span>
                   <span className="text-[9px] uppercase font-bold text-gray-400">Score</span>
                 </button>
                 <button onClick={() => addElement('timer')} className="p-3 rounded glass hover:bg-white/5 flex flex-col items-center gap-2">
                   <span className="material-symbols-outlined text-cyan-400">timer</span>
                   <span className="text-[9px] uppercase font-bold text-gray-400">Timer</span>
                 </button>
                 <button onClick={() => addElement('box')} className="p-3 rounded glass hover:bg-white/5 flex flex-col items-center gap-2">
                   <span className="material-symbols-outlined text-cyan-400">check_box_outline_blank</span>
                   <span className="text-[9px] uppercase font-bold text-gray-400">Box</span>
                 </button>
                 <button onClick={() => addElement('image')} className="p-3 rounded glass hover:bg-white/5 flex flex-col items-center gap-2 col-span-2">
                   <span className="material-symbols-outlined text-cyan-400">image</span>
                   <span className="text-[9px] uppercase font-bold text-gray-400">Image</span>
                 </button>
              </div>

              <div className="mt-8 border-t border-white/10 pt-4 flex flex-col gap-2">
                 <h3 className="text-[10px] font-bold text-gray-500 uppercase mb-1">Save Template</h3>
                 <div className="flex gap-2">
                   <input 
                     value={saveName} 
                     onChange={e => setSaveName(e.target.value)} 
                     placeholder="Template Name" 
                     className="flex-1 bg-black/50 border border-white/10 rounded px-2 py-1 text-xs outline-none focus:border-[#00F5FF]/50" 
                   />
                   <select 
                     value={saveCategory} 
                     onChange={e => setSaveCategory(e.target.value)}
                     className="w-20 bg-black/50 border border-white/10 rounded px-1 py-1 text-[10px] outline-none"
                   >
                     <option value="Sports">Sports</option>
                     <option value="News">News</option>
                     <option value="Gaming">Gaming</option>
                     <option value="Custom">Custom</option>
                   </select>
                 </div>
                 <button 
                   onClick={saveTemplate} 
                   className="w-full py-1.5 rounded bg-[#00F5FF]/20 text-[#00F5FF] border border-[#00F5FF]/30 text-[10px] font-bold hover:bg-[#00F5FF]/30"
                 >
                   SAVE CURRENT
                 </button>
              </div>

              <div className="mt-4 border-t border-white/10 pt-4 overflow-y-auto">
                 <h3 className="text-[10px] font-bold text-gray-500 uppercase mb-3">Saved Templates</h3>
                 <div className="flex flex-col gap-2">
                    {templates.map(tmpl => (
                      <div 
                        key={tmpl.id} 
                        onClick={() => loadTemplate(tmpl)}
                        className="p-2 rounded bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 cursor-pointer flex justify-between items-center transition-colors"
                      >
                        <div>
                          <div className="text-[10px] font-bold text-white">{tmpl.name}</div>
                          <div className="text-[8px] opacity-60 uppercase">{tmpl.category}</div>
                        </div>
                        <span className="material-symbols-outlined text-[14px] text-cyan-400">add_box</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </section>

        {/* Canvas */}
        <section className="col-span-8 flex flex-col bg-black rounded-lg border border-white/5 relative overflow-hidden" onClick={() => setSelectedId(null)}>
           <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
             <span className="font-mono text-sm uppercase tracking-[5px]">1920 x 1080 Workspace</span>
           </div>

           {/* Overlay Elements */}
           {elements.map(el => (
             <motion.div
               key={el.id}
               drag
               dragMomentum={false}
               onDragEnd={(_, info) => {
                  updateElement(el.id, { x: el.x + info.offset.x, y: el.y + info.offset.y });
               }}
               onClick={(e) => { e.stopPropagation(); setSelectedId(el.id); }}
               initial={{ x: el.x, y: el.y }}
               animate={{ x: el.x, y: el.y }}
               className={`absolute cursor-move ${selectedId === el.id ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-black' : ''}`}
               style={{
                 width: el.width,
                 height: el.height,
                 backgroundColor: el.bgColor,
                 color: el.color,
                 fontSize: el.fontSize,
                 fontFamily: el.fontFamily,
                 opacity: el.opacity,
                 borderRadius: el.borderRadius,
                 borderWidth: el.borderWidth,
                 borderColor: el.borderColor,
                 borderStyle: el.borderWidth ? 'solid' : 'none',
                 boxShadow: el.shadow !== 'none' ? el.shadow : undefined,
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
                 fontWeight: 'bold',
                 textShadow: el.type !== 'box' && el.type !== 'image' ? '0 2px 4px rgba(0,0,0,0.8)' : 'none',
                 backgroundImage: el.type === 'image' ? `url(${el.content})` : 'none',
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
                 overflow: 'hidden'
               }}
             >
               {el.type !== 'image' && el.content}
             </motion.div>
           ))}
        </section>

        {/* Right Properties Panel */}
        <section className="col-span-2 flex flex-col gap-3 overflow-hidden h-full">
           <div className="glass rounded-xl p-4 flex flex-col gap-4 h-full">
              <h3 className="text-[10px] font-bold text-gray-500 uppercase">Properties</h3>
              
              {selectedEl ? (
                <div className="flex flex-col gap-4 overflow-y-auto pr-2 pb-10">
                   <div className="flex flex-col gap-1">
                      <label className="text-[9px] uppercase font-bold text-gray-500">Content</label>
                      <input 
                        type="text" 
                        value={selectedEl.content || ''} 
                        onChange={e => updateElement(selectedEl.id, { content: e.target.value })}
                        className="bg-black/50 border border-white/10 rounded px-2 py-1 text-xs"
                      />
                   </div>
                   
                   <div className="flex flex-col gap-1">
                      <label className="text-[9px] uppercase font-bold text-gray-500">Color</label>
                      <input 
                        type="color" 
                        value={selectedEl.color || '#FFFFFF'} 
                        onChange={e => updateElement(selectedEl.id, { color: e.target.value })}
                        className="bg-black/50 border border-white/10 rounded px-1 py-1 text-xs w-full h-8"
                      />
                   </div>

                   {selectedEl.type === 'box' && (
                     <div className="flex flex-col gap-1">
                        <label className="text-[9px] uppercase font-bold text-gray-500">Background</label>
                        <input 
                          type="color" 
                          value={selectedEl.bgColor || '#000000'} 
                          onChange={e => updateElement(selectedEl.id, { bgColor: e.target.value })}
                          className="bg-black/50 border border-white/10 rounded px-1 py-1 text-xs w-full h-8"
                        />
                     </div>
                   )}

                   <div className="flex flex-col gap-1">
                      <label className="text-[9px] uppercase font-bold text-gray-500">Font Size</label>
                      <input 
                        type="number" 
                        value={selectedEl.fontSize || 24} 
                        onChange={e => updateElement(selectedEl.id, { fontSize: parseInt(e.target.value) })}
                        className="bg-black/50 border border-white/10 rounded px-2 py-1 text-xs"
                      />
                   </div>

                   {(selectedEl.type === 'box' || selectedEl.type === 'image') && (
                     <>
                       <div className="flex flex-col gap-1">
                          <label className="text-[9px] uppercase font-bold text-gray-500">Width</label>
                          <input 
                            type="number" 
                            value={selectedEl.width as number} 
                            onChange={e => updateElement(selectedEl.id, { width: parseInt(e.target.value) })}
                            className="bg-black/50 border border-white/10 rounded px-2 py-1 text-xs"
                          />
                       </div>
                       <div className="flex flex-col gap-1">
                          <label className="text-[9px] uppercase font-bold text-gray-500">Height</label>
                          <input 
                            type="number" 
                            value={selectedEl.height as number} 
                            onChange={e => updateElement(selectedEl.id, { height: parseInt(e.target.value) })}
                            className="bg-black/50 border border-white/10 rounded px-2 py-1 text-xs"
                          />
                       </div>
                       <div className="flex flex-col gap-1">
                          <label className="text-[9px] uppercase font-bold text-gray-500">Border Radius</label>
                          <input 
                            type="number" 
                            value={selectedEl.borderRadius || 0} 
                            onChange={e => updateElement(selectedEl.id, { borderRadius: parseInt(e.target.value) })}
                            className="bg-black/50 border border-white/10 rounded px-2 py-1 text-xs"
                          />
                       </div>
                       <div className="flex flex-col gap-1">
                          <label className="text-[9px] uppercase font-bold text-gray-500">Border Width</label>
                          <input 
                            type="number" 
                            value={selectedEl.borderWidth || 0} 
                            onChange={e => updateElement(selectedEl.id, { borderWidth: parseInt(e.target.value) })}
                            className="bg-black/50 border border-white/10 rounded px-2 py-1 text-xs"
                          />
                       </div>
                       <div className="flex flex-col gap-1">
                          <label className="text-[9px] uppercase font-bold text-gray-500">Border Color</label>
                          <input 
                            type="color" 
                            value={selectedEl.borderColor || '#FFFFFF'} 
                            onChange={e => updateElement(selectedEl.id, { borderColor: e.target.value })}
                            className="bg-black/50 border border-white/10 rounded px-1 py-1 text-xs w-full h-8"
                          />
                       </div>
                     </>
                   )}

                   <div className="flex flex-col gap-1">
                      <label className="text-[9px] uppercase font-bold text-gray-500">Opacity</label>
                      <input 
                        type="range" 
                        min="0" max="1" step="0.1"
                        value={selectedEl.opacity ?? 1} 
                        onChange={e => updateElement(selectedEl.id, { opacity: parseFloat(e.target.value) })}
                        className="w-full"
                      />
                   </div>

                   <button 
                     onClick={() => setElements(elements.filter(e => e.id !== selectedEl.id))}
                     className="mt-4 p-2 bg-red-600/20 text-red-500 rounded border border-red-500/20 text-[10px] uppercase font-bold hover:bg-red-600/40"
                   >
                     Delete Element
                   </button>
                </div>
              ) : (
                <div className="text-xs text-gray-500 text-center mt-10">
                  Select an element to edit properties
                </div>
              )}
           </div>
        </section>
      </main>
    </div>
  );
}

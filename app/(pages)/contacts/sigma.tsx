/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import StepperPlainText from '@/app/services/StepperForm';
import { Badge, Button, Label, TabItem, Tabs, Textarea, TextInput } from 'flowbite-react';
import Graph from 'graphology';
import React, { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import type { EdgeDisplayData, NodeDisplayData } from 'sigma/types';
import AIChat from './aiChat';
import data from './data.json';

// --- Custom node type ---
interface CustomNodeDisplayData extends NodeDisplayData {
  baseSize?: number;
  pulseOffset?: number;
  labelSize?: number;
  labelColor?: string;
  labelBackground?: string;
}

const SigmaGraph: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const datalistRef = useRef<HTMLDataListElement>(null);
  const [selectedNode, setSelectedNode] = useState<Record<string, unknown> | null>(null);
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    if (!containerRef.current || !inputRef.current || !datalistRef.current) return;

    const graph = new Graph();

    // --- Add nodes ---
    data.nodes.forEach((node: Record<string, any>) => {
      if (!graph.hasNode(node.id)) {
        graph.addNode(node.id, {
          ...node,
          baseSize: node.size ?? 10,
          pulseOffset: Math.random() * Math.PI * 2,
        } as CustomNodeDisplayData);
      }
    });

    // --- Add edges ---
    data.edges.forEach((edge: Record<string, any>) => {
      if (!graph.hasEdge(edge.source, edge.target)) {
        graph.addEdge(edge.source, edge.target, { ...edge });
      }
    });

    // --- Renderer (dynamically import Sigma on client only) ---
    let renderer: any = null;
    const state = {
      hoveredNode: null as string | null,
      hoveredNeighbors: null as Set<string> | null,
    };

    let animationFrame: number | null = null;
    let outerInputEl: HTMLInputElement | null = null;
    let outerHandleSearch: (() => void) | null = null;

    (async () => {
      // Dynamically import Sigma to avoid referencing WebGL on the server
      const SigmaModule = await import('sigma');
      // default export contains the constructor
      const SigmaCtor = (SigmaModule as any).default ?? (SigmaModule as any);

      const settings = {
        labelSize: 16,
        labelRenderedSizeThreshold: 0,
        labelGridCellSize: 60,
        labelDensity: 1,
        labelSizeMode: 'fixed',
        labelColor: { mode: 'nodes', attribute: 'color' }, // use node color
        labelBackground: 'node',
        labelBackgroundColor: { mode: 'nodes', attribute: 'color' },
        labelBackgroundAlpha: 0.3,
      } as unknown as any;

      renderer = new SigmaCtor(graph, containerRef.current, settings);

      // --- Populate datalist for search ---
      datalistRef.current!.innerHTML = graph
        .nodes()
        .map((node) => `<option value="${graph.getNodeAttribute(node, 'label')}"></option>`)
        .join('\n');

      // --- Hover handling ---
      const setHoveredNode = (node?: string) => {
        if (node) {
          state.hoveredNode = node;
          state.hoveredNeighbors = new Set(graph.neighbors(node));
        } else {
          state.hoveredNode = null;
          state.hoveredNeighbors = null;
        }
        renderer.refresh({ skipIndexation: true });
      };

      // --- Node reducer ---
      renderer.setSetting('nodeReducer', (node: string, data: any) => {
        const res: CustomNodeDisplayData = { ...data };
        res.label = data.label;
        res.labelSize = data.labelSize ?? 24;
        res.labelColor = '#ffffff';
        res.labelBackground = 'transparent';
        res.color = data.color || '#fff';

        if (state.hoveredNeighbors && !state.hoveredNeighbors.has(node) && state.hoveredNode !== node) {
          res.label = '';
          res.color = '#fafa';
        }

        if (state.hoveredNode === node) {
          res.size = (data.baseSize ?? data.size ?? 10) + 4;
          res.labelSize = (data.labelSize ?? 24) + 6;
          res.labelColor = '#000000';
          res.labelBackground = '#ffffff';
        }

        return res;
      });

      // --- Edge reducer ---
      renderer.setSetting('edgeReducer', (edge: string, data: any) => {
        const res: Partial<EdgeDisplayData> = { ...data };
        if (
          state.hoveredNode &&
          !graph.extremities(edge).includes(state.hoveredNode) &&
          !graph.areNeighbors(graph.source(edge), state.hoveredNode)
        ) {
          res.hidden = true;
        }
        return res;
      });

      // --- Search ---
      const handleSearchLocal = () => {
        const value = inputRef.current?.value?.trim().toLowerCase();
        if (!value) return;

        const foundNode = graph.nodes().find((n) => graph.getNodeAttribute(n, 'label')?.toLowerCase() === value);

        if (foundNode) {
          const attributes = graph.getNodeAttributes(foundNode);
          setSelectedNode({ id: foundNode, ...attributes });

          const camera = renderer.getCamera();
          const pos = renderer.getNodeDisplayData(foundNode);
          if (pos) camera.animate(pos, { duration: 600 });
        }
      };

      // attach search listener (capture element reference)
      const inputEl = inputRef.current;
      inputEl?.addEventListener('change', handleSearchLocal);
      // expose to outer scope for cleanup
      outerInputEl = inputEl;
      outerHandleSearch = handleSearchLocal;

      // --- Sigma events ---
      renderer.on('enterNode', ({ node }: { node: string }) => setHoveredNode(node));
      renderer.on('leaveNode', () => setHoveredNode(undefined));
      renderer.on('clickNode', ({ node }: { node: string }) => {
        const attributes = graph.getNodeAttributes(node);
        setSelectedNode({ id: node, ...attributes });
      });

      // --- Pulse animation ---
      const animate = () => {
        const t = Date.now() / 1000;
        graph.forEachNode((node) => {
          const baseSize = graph.getNodeAttribute(node, 'baseSize') ?? 8;
          const offset = graph.getNodeAttribute(node, 'pulseOffset') ?? 0;
          const pulse = Math.sin(t * 4 + offset) * 1.5 + baseSize;
          graph.setNodeAttribute(node, 'size', pulse);
        });
        renderer?.refresh?.();
        animationFrame = requestAnimationFrame(animate);
      };
      animate();

      // cleanup when effect is torn down - nothing to do here; outer cleanup will run
    })();

    // --- Cleanup ---
    return () => {
      try {
        if (renderer && typeof renderer.kill === 'function') renderer.kill();
      } catch {
        // ignore
      }
      if (outerInputEl && outerHandleSearch) {
        outerInputEl.removeEventListener('change', outerHandleSearch);
      }
      if (animationFrame != null) cancelAnimationFrame(animationFrame);
    };
  }, []);

  const AiChatIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 10h.01M12 10h.01M16 10h.01M9 16h6M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z"
      />
    </svg>
  );

  const ScheduleCallIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z"
      />
    </svg>
  );

  const ExploreMoreIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 8c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0 0V4m0 16v-4m8-8h-4M4 12h4m12.364 5.364l-2.828-2.828M6.464 6.464l2.828 2.828M17.657 6.343l-2.828 2.828M6.343 17.657l2.828-2.828"
      />
    </svg>
  );
  const [activeSection, setActiveSection] = useState<'payment' | 'questions' | null>(null);

  return (
    <div className="graph-container relative p-4 md:max-w-5xl max-w-80 m-auto overflow-hidden h-auto">
      {/* 🔹 Background Video */}
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
        <source src="/bg-space-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* 🔹 Black transparent overlay */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* 🔹 Foreground content stays above overlay */}
      <div className="relative z-10">
        <div className="grid grid-cols-3 gap-4 mb-2">
          <div>
            <input
              ref={inputRef}
              list="suggestions"
              placeholder="Search Your Project Category..."
              className="border-0 shadow-lg bg-white p-3 w-full rounded text-black"
              onKeyDown={(e) => {
                if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
              }}
            />
          </div>
          <div>
            <input
              ref={inputRef}
              list="suggestions"
              placeholder="Search Your Project Category..."
              className="border-0 shadow-lg bg-white p-3 w-full rounded text-black"
              onKeyDown={(e) => {
                if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
              }}
            />
          </div>
          <div>
            <input
              ref={inputRef}
              list="suggestions"
              placeholder="Search Your Project Category..."
              className="border-0 shadow-lg bg-white p-3 w-full rounded text-black"
              onKeyDown={(e) => {
                if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
              }}
            />
          </div>
        </div>

        <datalist id="suggestions" ref={datalistRef} />

        <div ref={containerRef} id="sigma-container" style={{ height: '600px', width: '100%' }} />

        {selectedNode && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 shadow">
            <div className="bg-white p-6  z-50 rounded shadow-xl max-w-5xl w-full overflow-auto relative">
              <button
                type="button"
                className="bg-blue-100 text-black hover:scale-105 absolute right-1.5 inline-block font-bold py-3 px-8 rounded-full"
              >
                Explore More
              </button>
              <Tabs aria-label="Tabs with icons" variant="underline">
                <TabItem active title="AI Chat">
                  <AIChat />
                </TabItem>

                <TabItem title="Schedule a Call">
                  <h2 className="text-1xl mb-5 text-center text-black">
                    Selected Area: <strong>{String(selectedNode.label)}</strong>
                  </h2>

                  <div className="flex justify-center"></div>
                  <div className="schedule-div w-full max-w-7xl mx-auto p-4">
                    {/* ---- Label and Textarea ---- */}
                    <div className="w-full mb-5">
                      <div className="mb-2 block text-left">
                        <Label htmlFor="comment">
                          Share your Requirements and avail 30 minutes free consultation{' '}
                          <button
                            type="button"
                            onClick={() => setActiveSection(activeSection === 'payment' ? null : 'payment')}
                            className="underline text-blue-800 hover:text-blue-600"
                          >
                            Add Payment
                          </button>{' '}
                          Now. You can simply share a note below or answer a{' '}
                          <button
                            type="button"
                            onClick={() => setActiveSection(activeSection === 'questions' ? null : 'questions')}
                            className="underline text-blue-800 hover:text-blue-600"
                          >
                            Few Questions
                          </button>{' '}
                          to make this meeting more productive.
                        </Label>
                      </div>
                      {/* ---- Conditional Sections ---- */}
                      {activeSection === 'payment' && (
                        <div className="p-5 bg-white border border-gray-200 rounded-lg animate-fadeIn">
                          <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
                            💳 Add Payment Details
                          </h3>

                          <form className="space-y-4">
                            <div>
                              <TextInput
                                id="card-name"
                                type="text"
                                placeholder="Full Name"
                                required
                                className="mt-1 bg-white"
                              />
                            </div>

                            <div>
                              <TextInput
                                id="card-number"
                                type="text"
                                placeholder="Card Number"
                                required
                                className="mt-1"
                              />
                            </div>

                            <div className="flex gap-3">
                              <div className="w-1/2">
                                <TextInput
                                  id="expiry"
                                  type="text"
                                  placeholder="Expiry Dtae(MM/YY)"
                                  required
                                  className="mt-1"
                                />
                              </div>
                              <div className="w-1/2">
                                <TextInput id="cvv" type="password" placeholder="CVV" required className="mt-1" />
                              </div>
                            </div>

                            <div className="pt-2 flex justify-end gap-2">
                              <Button
                                className="bg-transparent border border-blue-500 text-black px-4 font-bold py-3 rounded-full uppercase tracking-wide hover:scale-105 transition"
                                onClick={() => setActiveSection(null)}
                                type="button"
                              >
                                Cancel
                              </Button>
                              <Button className="rounded-full" color="blue" type="submit">
                                Add Payment
                              </Button>
                            </div>
                          </form>
                        </div>
                      )}

                      {activeSection === 'questions' && (
                        <div className="p-4 bg-gray-50 border rounded-lg tpy-4">
                          <StepperPlainText />
                          {/* <Button onClick={() => setActiveSection(null)}>Close</Button> */}
                        </div>
                      )}
                      <Textarea
                        id="query"
                        placeholder="Write your Requirements..."
                        rows={4}
                        className={`mt-5 ${activeSection ? 'bg-gray-50/50 text-gray-400 cursor-not-allowed' : 'bg-white'}`}
                        disabled={!!activeSection}
                      />
                    </div>

                    {/* ---- Date Picker ---- */}
                    <div className="flex flex-col gap-2 mb-4 text-left">
                      <label className="text-sm font-medium text-gray-700">Select Date & Time</label>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date as Date)}
                        showTimeSelect
                        dateFormat="MMMM d, yyyy h:mm aa"
                        className={`w-full p-2 border rounded-md ${activeSection ? 'bg-gray-50/50 text-gray-400 border-gray-200 cursor-not-allowed' : 'border-gray-300 text-black'}`}
                        disabled={!!activeSection}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-3">
                    <div>
                      {' '}
                      <Badge className="shadow" color="success">
                        Share your Requirements and avail 30 minutes free consultation Add Payment Now.
                      </Badge>
                    </div>
                    <div>
                      <button
                        className={`inline-block font-bold py-3 px-8 rounded-full mr-3 uppercase tracking-wide transition ${activeSection ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-100 text-black hover:scale-105'}`}
                        disabled={!!activeSection}
                      >
                        Pay
                      </button>
                      <button
                        onClick={() => setSelectedNode(null)}
                        className={`font-bold py-3 px-4 rounded-full uppercase tracking-wide transition ${activeSection ? 'bg-gray-200 border border-gray-300 text-gray-400 cursor-not-allowed hidden' : 'bg-transparent border border-blue-500 text-black hover:scale-105'}`}
                        disabled={!!activeSection}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </TabItem>

                {/* <TabItem title="Explore More" >
                                    This is <span className="font-medium text-gray-800 dark:text-white">Dashboard tab's associated content</span>.
                                </TabItem> */}
              </Tabs>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SigmaGraph;

import { useEffect, useState } from "react";
import BasicDocumentType from "../../../types/BasicDocumentType";
import IPTCType from "../../../types/IPTCType";
import * as documentApi from "../../../api/DocumentApi"
import { useMutation } from "react-query";

interface SidebarProps {
    chunkDistance: number;
    size: number;
    document: BasicDocumentType | null;
    IPTCs: IPTCType[];
    setSize: React.Dispatch<React.SetStateAction<number>>;
    setChunkDistance: React.Dispatch<React.SetStateAction<number>>;
    setIPTC: React.Dispatch<React.SetStateAction<IPTCType | null>>;
}
/**
 * Sidebar component that contains various controls to change the viewer.
 * 
 * @component
 * @example
 * return (
    <Sidebar
          size={size}
          setSize={setSize}
          chunkDistance={chunkDistance}
          setChunkDistance={setChunkDistance}
          document={hoveredDocument}
          IPTCs={IPTCs}
          setIPTC={setIPTC}
        />
 * )
 */
export const Sidebar = (props: SidebarProps) => {
    const [IPTC, setIPTC] = useState<IPTCType | null>(null);
    const [levels, setLevels] = useState<number[]>([]);
    const [level, setLevel] = useState<number>(0);

    const { mutate, isLoading } = useMutation(documentApi.getIPTC, {
        onSuccess: (data: IPTCType) => {
            setIPTC(data);
            const dataLevels = data.meta.map(entry => entry.level);
            const uniqueLevels = [...new Set(dataLevels)]
            setLevels(uniqueLevels);
            setLevel(uniqueLevels[0]);
        },
        onError: (error: any) => {
            setIPTC(null);
        }
    });

    function selectIPTC(id: string) {
        const IPTCSet = props.IPTCs.filter(set => set.id === parseInt(id));

        if (IPTCSet.length > 0) {
            mutate(IPTCSet[0].id);
        } else {
            setIPTC(null);
            setLevels([]);
            setLevel(0);
        }
    }

    useEffect(() => {
        if (IPTC === null) {
            props.setIPTC(null)
        } else {
            const temp = IPTC!.meta.filter(x => x.level === level);
            const tempy = { id: IPTC!.id, name: IPTC!.name, meta: temp }
            props.setIPTC(tempy);
        }
    }, [IPTC, level])

    return (
        <aside style={{ width: "17.5%" }} aria-label="Sidebar">
            <div className="overflow-y-hidden py-4 px-3 heigt-full bg-gray-50 dark:bg-gray-800" style={{ height: "calc(100vh - 80px)" }}>

                <div id="dropdown-cta" className="p-4 mb-6 bg-blue-50 rounded-lg dark:bg-blue-900" role="alert">
                    <div className="flex items-center mb-3">
                        <span className="bg-orange-100 text-orange-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">Beta</span>
                    </div>
                    <p className="mb-3 text-sm text-blue-900 dark:text-blue-400">
                        This is a beta version of the application. Not all buttons will work and bugs may occur. Thanks for understanding.
                    </p>
                </div>

                <div className="mb-2 nowrap flex flex-row">
                    <div style={levels.length > 0 ? { width: "63%", marginRight: "3%" } : { width: "100%", marginRight: "0" }}>
                        <select className="items-center w-full text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            name="IPTCs" id="IPTCs"
                            onChange={(e) => { selectIPTC(e.target.value) }}>
                            <option value="none">Select a wordlist</option>
                            {props.IPTCs.map((IPTCOption) => {
                                return (
                                    <option key={IPTCOption.id} value={IPTCOption.id}>{IPTCOption.name}</option>
                                )
                            })}
                        </select>
                    </div>

                    {levels.length > 0 &&
                        <div style={{ width: "33%" }}>
                            <select className="items-center w-full text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                name="IPTCs" id="IPTCs"
                                onChange={(e) => { setLevel(parseInt(e.target.value)) }}>
                                {
                                    levels.map((lvl) => {
                                        return (
                                            <option key={lvl} value={lvl}>{lvl}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    }
                </div>

                <div className="lex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white">
                    <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">Performance</span>
                </div>

                <div className="lex items-center pl-2 text-base font-normal text-gray-900 rounded-lg dark:text-white">
                    <span className="self-center text-base font-semibold whitespace-nowrap  text-slate-600 dark:text-slate-400">Chunk distance: {props.chunkDistance}</span>
                </div>
                <div className="hidden md:block flex flex-col space-y-2 p-2 w-full mb-2">
                    <input defaultValue={props.chunkDistance} type="range" className="w-full" min="0" max="3" step="1"
                        onChange={(e) => { props.setChunkDistance(parseInt(e.target.value)) }} />
                </div>

                <div className="lex items-center pl-2 text-base font-normal text-gray-900 rounded-lg dark:text-white">
                    <span className="self-center text-base font-semibold whitespace-nowrap  text-slate-600 dark:text-slate-400">Showing: {Math.floor(props.size * 100)}%</span>
                </div>
                <div className="hidden md:block flex flex-col space-y-2 p-2 w-full mb-2">
                    <input defaultValue={Math.floor(props.size * 100)} type="range" className="w-full" min="1" max="100" step="1"
                        onChange={(e) => { props.setSize(parseInt(e.target.value) / 100) }} />
                </div>

                <div className="lex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white">
                    <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">Document</span>
                </div>
                <div className="lex items-center pl-2 text-base font-normal text-gray-900 rounded-lg dark:text-white">
                    <span className="self-center text-base font-semibold whitespace-wrap">{
                        props.document === null ? "Hover over a document to see the title." : props.document.name
                    }</span>
                </div>

            </div>
        </aside >
    )
}

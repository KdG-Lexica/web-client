export const Tutorial = () => {
    return (
        <div className="bg-slate-200 dark:bg-neutral-900 flex flex-row items-start h-full justify-center">
            <div className="w-1/4 sticky top-0">
                <div className="flex flex-col items-start justify-center space-y-4 mt-4 ml-4 mb-4">
                    <div className="rounded bg-slate-100 dark:bg-slate-800 min-w-full p-2">
                        <p className="font-sans dark:text-white black:text-black font-medium text-xl p-2">Index</p>
                        <ul className="flex flex-col m-2">
                            <li>
                                <a href="#1" className={`text-slate-600 dark:text-slate-400 cursor-pointer block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>
                                    Spatial Document Viewer
                                </a>
                            </li>
                            <li>
                                <a href="#2" className={`text-slate-600 dark:text-slate-400 cursor-pointer block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>
                                    Selecting a dataset
                                </a>
                            </li>
                            <li>
                                <a href="#3" className={`text-slate-600 dark:text-slate-400 cursor-pointer block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>
                                    Viewer
                                </a>
                            </li>
                            <li>
                                <a href="#4" className={`text-slate-600 dark:text-slate-400 cursor-pointer block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>
                                    Performance sidebar
                                </a>
                            </li>
                            <li>
                                <a href="#5" className={`text-slate-600 dark:text-slate-400 cursor-pointer block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>
                                    Spatial Viewer
                                </a>
                            </li>
                            <li>
                                <a href="#5a" className={`ml-4 text-slate-600 dark:text-slate-400 cursor-pointer block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>
                                    Controls
                                </a>
                            </li>
                            <li>
                                <a href="#5b" className={`ml-4 text-slate-600 dark:text-slate-400 cursor-pointer block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>
                                    Viewer options
                                </a>
                            </li>
                            <li>
                                <a href="#6" className={`text-slate-600 dark:text-slate-400 cursor-pointer block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>
                                    Document sidebar
                                </a>
                            </li>
                            <li>
                                <a href="#7" className={`text-slate-600 dark:text-slate-400 cursor-pointer block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>
                                    Filtering
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="w-3/4">
                <div className="flex flex-col items-center h-full justify-center space-y-4 m-4">
                        <div id="1" className="rounded bg-slate-100 dark:bg-slate-800 min-w-full p-2">
                            <p className="font-sans dark:text-white black:text-black font-medium text-xl p-2">Spatial Document Viewer</p>
                            <p className="font-sans text-slate-600 dark:text-slate-400 p-2">
                                Welcome to the Spatial Document Viewer. In this quick tutorial you'll find everything from how
                                to navigate data to more complex features such as filtering.                        
                            </p>
                        </div>
                        <div id="2" className="rounded bg-slate-100 dark:bg-slate-800 min-w-full p-2">
                            <p className="font-sans dark:text-white black:text-black font-medium text-xl p-2">Selecting a dataset</p>
                            <p className="font-sans text-slate-600 dark:text-slate-400 p-2">
                                Selecting a dataset can be done easily on the home screen.                        
                            </p>
                            <p className="font-sans text-slate-600 dark:text-slate-400 p-2">
                                1. Navigate to the home screen. <br/>
                                2. Go to the dataset you wish to explore <br/>
                                3. Adjust the slider to configure loading times, lower amounts will show less data but are beter suited for low performance devices.<br/>
                                4. Click "Browse data".<br/>
                                5. Your dataset will start loading, depending on your networkspeed this could take a while.      
                            </p>
                        </div>
                        <div id="3" className="rounded bg-slate-100 dark:bg-slate-800 min-w-full p-2">
                            <p className="font-sans dark:text-white black:text-black font-medium text-xl p-2">Viewer</p>
                            <p className="font-sans text-slate-600 dark:text-slate-400 p-2">
                                The viewer consists of three sections.                        
                            </p>
                            <p className="font-sans text-slate-600 dark:text-slate-400 p-2">
                                1. Performance sidebar, on the left, handles performance settings. <br/>
                                2. Spatial view, in the middle, the dataset. <br/>
                                3. Document sidebar, on the right, shows contents of a document. <br/>
                                </p>
                        </div>
                        <div id="4" className="rounded bg-slate-100 dark:bg-slate-800 min-w-full p-2">
                            <p className="font-sans dark:text-white black:text-black font-medium text-xl p-2">Performance sidebar</p>
                            <p className="font-sans text-slate-600 dark:text-slate-400 p-2">
                                In the performance sidebar you can tweak the amount of data that is shown, change the chunk distance, select a wordlist and check what document is currently hovered over.                        
                            </p>
                            <p className="font-sans text-slate-600 dark:text-slate-400 p-2">
                                1. Select a wordlist by going in the dropdown menu, depending on the amount of words in this set, this can have an impact on performance.<br/>
                                2. Use the "Chunk distance" slider to select how many neighbouring chunks are shown, relative to the cursor.<br/>
                                3. Use the "Showing" slider to select which percentage of data is shown, we recomment to keep this number low on laptops and mobile devices.
                            </p>
                        </div>
                        <div id="5" className="rounded bg-slate-100 dark:bg-slate-800 min-w-full p-2">
                            <p className="font-sans dark:text-white black:text-black font-medium text-xl p-2">Spatial viewer</p>
                            <p className="font-sans text-slate-600 dark:text-slate-400 p-2">
                                This is where the magic happens, in the Spatial Viewer you can browse all the data. Click on a document to open it in the Document Viewer.
                            </p>
                            <div id="5a" className="rounded bg-slate-100 dark:bg-slate-800 min-w-full p-2">
                                <p className="font-sans dark:text-white black:text-black font-medium text-xl p-2">Controls</p>
                                <p className="font-sans text-slate-600 dark:text-slate-400 p-2">
                                    1. Use the scrollwheel to zoom in and out.<br/>
                                    2. Click and drag to orbit<br/>
                                    3. Right click and drag to pan.
                                </p>
                            </div>
                            <div id="5b" className="rounded bg-slate-100 dark:bg-slate-800 min-w-full p-2">
                                <p className="font-sans dark:text-white black:text-black font-medium text-xl p-2">Viewer options</p>
                                <p className="font-sans text-slate-600 dark:text-slate-400 p-2">
                                    1. Camera: reset the camera view.<br/>
                                    2. Axis: toggle the axis on or off.<br/>
                                    3. Scale: toggle the scale on or off.<br/>
                                    4. Filter: filter the data, more on that in "Filter".<br/>
                                    5. Resize: toggle the full-screen on or off.
                                </p>
                            </div>
                        </div>
                        <div id="6" className="rounded bg-slate-100 dark:bg-slate-800 min-w-full p-2">
                            <p className="font-sans dark:text-white black:text-black font-medium text-xl p-2">Document Sidebar</p>
                            <p className="font-sans text-slate-600 dark:text-slate-400 p-2">
                                In the document sidebar you can view a document. If no document is selected, metadata about the dataset will be shown. Besides the contenst of the document, you also get a few options in the top left corner.                        
                            </p>
                            <p className="font-sans text-slate-600 dark:text-slate-400 p-2">
                                1. Close: closes the document.<br/>
                                2. Camera: focuses on the document.<br/>
                                3. Link: toggle the cosine similar documents.<br/>
                            </p>
                        </div>
                        <div id="7" className="rounded bg-slate-100 dark:bg-slate-800 min-w-full p-2">
                            <p className="font-sans dark:text-white black:text-black font-medium text-xl p-2">Filtering</p>
                            <p className="font-sans text-slate-600 dark:text-slate-400 p-2">
                                The Spatial Document Viewer allows for complex filtering. In the filter view you can add a condition. Every condition starts out with a Where, from the dropdownlist you can choose a field to filter on, an operator and a value. Inside a condition you can chain multiple rules with AND or OR. You can also chain multiple conditions with an AND or OR. "Click Execute Query" to search.
                            </p>
                        </div>
                </div>
            </div>
        </div>

    )
}

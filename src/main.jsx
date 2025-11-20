import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from "react-router-dom";

import BubbleSortApp from './AlgorithmsVisualizer/Sorting/BubbleSort.jsx';
import SelectionSortApp from './AlgorithmsVisualizer/Sorting/SelectionSort.jsx';
import InsertionSortApp from './AlgorithmsVisualizer/Sorting/InsertionSort.jsx';
import MergeSortApp from './AlgorithmsVisualizer/Sorting/MergeSort.jsx';
import QuickSortApp from './AlgorithmsVisualizer/Sorting/Quicksort.jsx';

import ArrayApp from './AlgorithmsVisualizer/Array/array.jsx';
import SinglyLinkedListApp from './AlgorithmsVisualizer/SinglyLinkedList/SinglyLinkedList.jsx';

import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "sort/bubble-sort",
    element: <BubbleSortApp />
  },
  {
    path: 'sort/selection-sort',
    element: <SelectionSortApp />
  },
  {
    path: 'sort/insertion-sort',
    element: <InsertionSortApp />
  },
  {
    path: 'sort/merge-sort',
    element: <MergeSortApp />
  },
  {
    path: 'sort/quick-sort',
    element: <QuickSortApp />
  },
  {
    path: "array",
    element: <ArrayApp/>
  },
  {
    path: "singly-linked-list",
    element: <SinglyLinkedListApp/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>
    </RouterProvider>
  </StrictMode>,
)

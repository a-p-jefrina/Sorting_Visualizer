var inp_as=document.getElementById('a_size');
var n=inp_as.value;
var inp_aspeed=document.getElementById("a_speed");
var speed = inp_aspeed.value;
var array=[];
init();/* every time refresh it automatically generate array without pressing init button */
inp_as.addEventListener("input",update_array_size);
var speed=1000;
inp_aspeed.addEventListener("input",vis_speed);
let audioCtx=null;
function toggleSidebar() {
    var sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('open');
}
function playNote(freq)/* since user 1st interact with the page before hearing audio so function define */
{
    if(audioCtx==null)
    {     /*since some browsers do not support audiocontext 
    so extra lines must be added */
        audioCtx=new(
            AudioContext||
            webkitAudioContext||
            window.webkitAudioContext
        )();
    }
    const dur=0.1; /*play note */
    const osc=audioCtx.createOscillator();/*obj to play the song */
    osc.frequency.value=freq;
    osc.start();
    osc.stop(audioCtx.currentTime+dur);
    const node=audioCtx.createGain();/* to set up volume */
    node.gain.value=0.1;
    node.gain.linearRampToValueAtTime(0,audioCtx.currentTime+dur);/*to avoid merging */
    osc.connect(node);
    node.connect(audioCtx.destination);/*connect to speakers */
}
function vis_speed()
{
    var array_speed=inp_aspeed.value;
    switch(parseInt(array_speed))
    {
        case 1: speed=500;
                break;
        case 2: speed=300;
                break;
        case 3: speed=150;
                break;
        case 4: speed=100;
                break;
        case 5: speed=10;
                break;
    }
}
/* array generate */
function init()
{
    array=[];
    for(let i=0;i<n;i++)
   {
    array[i]=Math.random();
   }
   showBars();
   closePopup();
}
function showComplexity(algo_name) {
    const algorithm = algo_name;
    const noteContent = document.getElementById("noteContent");
    switch (algorithm) {
        case "Bubble Sort":
          noteContent.textContent = "Time Complexity: Worst- O(n^2) Average- O(n^2) Best- Ω(n), Space Complexity: O(1)";
          break;
        case "Selection Sort":
          noteContent.textContent = "Time Complexity: Worst- O(n^2) Average- O(n^2) Best- Ω(n^2), Space Complexity: O(1)";
          break;
        case "Insertion Sort":
          noteContent.textContent = "Time Complexity: Worst- O(n^2) Average- O(n^2) Best- Ω(n), Space Complexity: O(1)";
          break;
        case "Quick Sort":
          noteContent.textContent = "Time Complexity: Worst- O(n^2) Average- O(nlogn) Best- Ω(nlogn), Space Complexity: O(log n)";
          break;
        default:
          noteContent.textContent = " ";
          break;
    }
    const note = document.getElementById("note");
    note.classList.add("active");
}
function closePopup() {
    noteContent.textContent = " ";  
} 
function update_array_size()
{
    n=inp_as.value;
    init();
}
function BubbleSort()
{
    showComplexity("Bubble Sort");
    const copy=[...array];/*already array play sort 
    swap sort ans wrong thus,using copy */
    const moves=bubblesort(copy);
    animate(moves);
}
function SelectionSort()
{
    showComplexity("Selection Sort");
    const copy=[...array];/*already array play sort 
    swap sort ans wrong thus,using copy */
    const moves=selectionsort(copy);
    animate(moves);   
}
function InsertionSort()
{
    showComplexity("Insertion Sort");
    const copy=[...array];/*already array play sort 
    swap sort ans wrong thus,using copy */
    const moves=insertionsort(copy);
    animate(moves);   
}
function QuickSort()
{
    showComplexity("Quick Sort");
    const copy=[...array];/*already array play sort 
    swap sort ans wrong thus,using copy */
    quicksort(copy);  
}
function animate(moves)
{
    if(moves.length==0)
    {    showBars();return;}
    const move=moves.shift(); /* return first element in swap array eg:[[1,2],[1,3]]
    i,j are created as new variables with block scope- variables are only accessible within the 
    block of code where they are declared */
    const [i,j]=move.indices;
    if(move.type=="swap")
    {[array[i],array[j]]=[array[j],array[i]];}
    playNote(200+array[i]*500); /*note interpolation */
    playNote(200+array[j]*500); /*two songs at the same time */
    showBars(move);
    setTimeout(function()
    {
        animate(moves);
    },speed);
}
function insertionsort(array)
{
    const moves=[];
    for (let i = 1; i < n; i++) {
        let j = i;
        while (j > 0 && array[j - 1] > array[j]) {
          // Comparison move
          moves.push({ indices: [j - 1, j], type: "comp" });
    
          // Swap move
          [array[j - 1], array[j]] = [array[j], array[j - 1]];
          moves.push({ indices: [j - 1, j], type: "swap" });
    
          j--;
        }
    }
    return moves;
}
function quicksort(array)
{
    if (array.length <= 1) {
        return array;
    }
    
    const moves = [];
    const result = [...array];
    quickSortHelper(result, 0, result.length - 1, moves);
    animate(moves); // Call the animate function with the moves array
    return result;
}
function quickSortHelper(array, start, end, moves) {
    if (start >= end) {
      return;
    }
    const pivotIndex = partition(array, start, end, moves);
    quickSortHelper(array, start, pivotIndex - 1, moves);
    quickSortHelper(array, pivotIndex + 1, end, moves);
}
function partition(array, start, end, moves) {
    const pivotValue = array[end];
    let pivotIndex = start;
  
    for (let i = start; i < end; i++) {
      moves.push({ indices: [i, pivotIndex], type: "comp" });
      if (array[i] < pivotValue) {
        swap(array, i, pivotIndex);
        moves.push({ indices: [i, pivotIndex], type: "swap" });
        pivotIndex++;
      }
    }
    swap(array, pivotIndex, end);
    moves.push({ indices: [pivotIndex, end], type: "swap" });
    return pivotIndex;
}
function swap(array, i, j) {
    [array[i], array[j]] = [array[j], array[i]];
}
function selectionsort(array)
{
    const moves=[]; /* to record the swapping*/
    for(let pass=0;pass<n-1;pass++)
    {
        var swapped=false;
        let min_index=pass;
        for(let i=pass+1;i<n;i++)
        {
            moves.push({indices:[min_index,i],type:"comp"});
            if(array[i]<array[min_index])
            {
                min_index=i;
            }  
        }
        if(min_index!=pass)
        {
            swapped=true;
            moves.push({indices:[pass,min_index],type:"swap"});
            [array[pass],array[min_index]]=[array[min_index],array[pass]];
        }
    }
    return moves;
}
function bubblesort(array){
    const moves=[]; /* to record the swapping*/
    let last=n-1;
    for(let pass=0;pass<n;pass++)  /* indexing starts from 0*/
    {
        var swapped=false;
        let exchange=0;
        for(let i=0;i<last;i++)
        {   moves.push({indices:[i,i+1],type:"comp"});
            if(array[i]>array[i+1])
            {
                swapped=true;
                moves.push({indices:[i,i+1],type:"swap"});/*object,which indices 
                evolved in the move and what type of it*/
                [array[i],array[i+1]]=[array[i+1],array[i]];
                exchange++;
            }
        }
        if (exchange==0) {return moves;}
        last=last-1;
    }
}
/* creating bars*/
function showBars(move)
{
    container.innerHTML="";  /* before going to 
    next iteration it clear and generate new bar */
    const barWidth=(100 / array.length)*0.5;
    for(let i=0;i<array.length;i++)
    {
    const bar=document.createElement("div");
    bar.style.height=array[i]*100+"%"; /*percent of height of container*/
    bar.style.width=barWidth+"%";
    bar.classList.add("bar");      /*width,margin,color,in css*/
    if(move && move.indices.includes(i)){ /* indices variable exists and is truthy (i.e., not null, 
    undefined, 0indices.includes(i) checks whether the value of i exists in the indices array. */
        bar.style.backgroundColor=move.type=="swap"?"red":"green";
    }
    container.appendChild(bar);
    }
}

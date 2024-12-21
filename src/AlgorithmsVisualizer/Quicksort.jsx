import * as React from 'react';
import { Typography, AppBar, Box, Stack, Slider, Button, FormControlLabel, Checkbox, Modal } from '@mui/material';
import { QuickSortWrapper } from '../Algorithms/SortingAlgorithms/QuickSort';
import { SOKERS } from '../CONSTANTS';
import { shuffle, generateArray } from './helper';

export default function QuickSortApp() {
    const [arraySize, setArraySize] = React.useState(10);
    const [array, setArray] = React.useState(Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100)));
    const [speed, setSpeed] = React.useState(1);
    const [isSokerMode, setisSoker] = React.useState(false);
    const [bars] = React.useState(document.getElementsByClassName("bars"));
    const [animationTimeouts, setAnimationTimeouts] = React.useState([]);
    const [isPopup, setisPopup] = React.useState(false);
    const [sokerIndex, setSokerIndex] = React.useState(bars.length - 1);
    const [Sokers] = React.useState(SOKERS);

    const Popup = (
        <Modal
            open={isPopup}
            onClose={() => setisPopup(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Box sx={{ backgroundColor: "white", height: "70vh", width: "80vh", borderRadius: "1rem", color: "black" }}>
                <Typography id="modal-modal-title" variant="h5" component="h2" textAlign="center" sx={{ fontFamily: "Pixelify Sans" }}>
                    Soker of the Sort 🤡🫠
                </Typography>
                <img src={bars[sokerIndex]?.nextElementSibling?.src} width="100%" height="85%"></img>
                <Typography id="modal-name" variant="h4" component="h2" textAlign="center" sx={{ fontFamily: "Pixelify Sans" }}>
                </Typography>
            </Box>
        </Modal>
    );

    React.useEffect(() => {
        for (let i = 0; i < (Math.random() * 5) + 1; i++) {
            shuffle([...Sokers]);
        }
    }, [Sokers]);

    React.useEffect(() => {
        setArray(generateArray(arraySize));
    }, [arraySize]);

    function QuickSortCaller() {
        animationTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
        setAnimationTimeouts([]);
    
        let auxillaryArray = array.slice();
        let animations = QuickSortWrapper(auxillaryArray);
    
        const baseDelay = 1600;
        const delayFactor = 1 / speed; 
        const delay = baseDelay * delayFactor; 
    
        let timeouts = animations.map((animation, index) => {
            return setTimeout(() => {
                const { comparison, swap, pivot } = animation;
    
                setArray((prevArray) => {
                    const updatedArray = [...prevArray];
                    if (swap) {
                        const [i, j] = swap;
                        [updatedArray[i], updatedArray[j]] = [updatedArray[j], updatedArray[i]];
                    }
                    return updatedArray;
                });
    
                if (comparison) {
                    const [i, j] = comparison;
                    bars[i].style.backgroundColor = "#FF4949";
                    bars[j].style.backgroundColor = "#FF4949";
                }
    
                if (pivot !== undefined) {
                    bars[pivot].style.backgroundColor = "yellow";
                }
    
                setTimeout(() => {
                    if (comparison) {
                        const [i, j] = comparison;
                        bars[i].style.backgroundColor = "#229799";
                        bars[j].style.backgroundColor = "#229799";
                    }
                }, 600 * delayFactor);
            }, index * delay);
        });
    
        setAnimationTimeouts(timeouts);
    
        setTimeout(() => {
            for (let i = 0; i < bars.length; i++) {
                bars[i].style.backgroundColor = "#229799";
            }
            setArray(auxillaryArray); 
            setSokerIndex(bars.length - 1);
            setisPopup(true);
        }, animations.length * delay);
    }
    

    return (
        <>
            {isSokerMode && Popup}
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed" sx={{ backgroundColor: "black", height: "70px" }}>
                    <Stack direction="row" sx={{ columnGap: { "sm": "10px", "md": "100px" } }}>
                        <Typography variant="h5" component="div" sx={{ fontFamily: "Pixelify Sans", padding: "20px 0px 0px 20px" }}>
                            Quick Sort
                        </Typography>
                        <Stack direction="row" gap={3} sx={{ padding: "25px 0px 0px 20px" }}>
                            <Typography variant="body" component="div" sx={{ fontFamily: "Pixelify Sans" }}>
                                Array Size
                            </Typography>
                            <Box sx={{ width: "200px" }}>
                                <Slider
                                    aria-label="Array Size"
                                    defaultValue={10}
                                    valueLabelDisplay="auto"
                                    value={arraySize}
                                    size="small"
                                    onChange={(event) => {
                                        setArraySize(event.target.value);
                                    }}
                                    disabled={isSokerMode}
                                    min={10}
                                    max={100}
                                />
                            </Box>
                            <Typography variant="body" component="div" sx={{ fontFamily: "Pixelify Sans" }}>
                                Speed
                            </Typography>
                            <Box sx={{ width: "200px" }}>
                                <Slider
                                    aria-label="Speed"
                                    defaultValue={1}
                                    valueLabelDisplay="auto"
                                    value={speed}
                                    size="small"
                                    onChange={(event) => {
                                        setSpeed(event.target.value);
                                    }}
                                    disabled={isSokerMode}
                                    min={1}
                                    max={50}
                                />
                            </Box>
                        </Stack>
                        <Box sx={{ padding: "18px 0px 0px 20px" }}>
                            <FormControlLabel control={<Checkbox sx={{ color: "#229799", '&.Mui-checked': { color: "#229799" } }} onChange={() => { setisSoker(!isSokerMode); shuffle(Sokers) }} />} label="Soker Mode 🤡!" />
                        </Box>
                        <div style={{ padding: "20px 0px 0px 20px" }}>
                            <Button onClick={QuickSortCaller} sx={{ textAlign: "center" }}>
                                <Typography variant="body2" component="div" sx={{ fontFamily: "Pixelify Sans" }}>
                                    Sort Now!
                                </Typography>
                            </Button>
                        </div>
                    </Stack>
                </AppBar>
            </Box>
            <Box sx={{ bgcolor: "#3C3D37", height: "100vh" }}>
                <Stack direction="row" spacing={0.5} sx={{ height: "90vh", mx: { "xs": "0px", "md": "130px" }, paddingTop: "60px", justifyContent: "center" }}>
                    {
                        isSokerMode ?
                            array.map((value, index) => (
                                <Stack key={index}>
                                    <Box key={index} className="bars" sx={{ width: `${Math.floor(window.innerWidth / (arraySize * 3))}px`, height: `${value * 0.9}%`, backgroundColor: "#229799" }} />
                                    {
                                        index < Sokers.length &&
                                        <img src={Sokers[index].image} width={`${Math.floor(window.innerWidth / (arraySize * 3))}px`}></img>
                                    }
                                                                        <Typography className="values" sx={{ textAlign: "center", fontFamily: "Pixelify Sans", fontSize: "small" }}>
                                        {value}
                                    </Typography>
                                </Stack>
                            ))
                            :
                            array.map((value, index) => (
                                <Stack key={index}>
                                    <Box key={index} className="bars" sx={{ width: `${Math.floor(window.innerWidth / (arraySize * 3))}px`, height: `${value * 0.9}%`, backgroundColor: "#229799" }} />
                                    <Typography className="values" sx={{ textAlign: "center", fontFamily: "Pixelify Sans", fontSize: "large",color: "#FFFFFF" }}>
                                        {value}
                                    </Typography>
                                </Stack>
                            ))
                    }
                </Stack>
            </Box>
        </>
    );
}

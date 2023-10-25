//獎項的圓餅圖DIV
import { useState ,useEffect} from 'react';

const RewardDiv = ({mainClass , data = {}, doOnClick ,showPaReward, showDrowedDrowResult}) => {

    const [isDrowed ,setIsDrowed] = useState(false);
    const [divData ,setDivData] = useState({});
    const [mainClazz ,setMainClazz] = useState("awards");

    const handleClick = () => {

        if(isDrowed){
            showDrowedDrowResult(divData);
        }else{
            showPaReward(true);
            doOnClick(divData);
        }

    };

    useEffect(() => {
        setDivData(data);
        setIsDrowed(!!data.drawingTime);
        setMainClazz(mainClass);
    });

    return (
        <>
            <div className={mainClazz}>
                <a onClick={handleClick}
                    className={isDrowed? "awards_atv":""}
                    data-bs-toggle={"modal"} 
                    data-bs-target={isDrowed? "#pa_list":"#pa_awards"}>
                        <img src={(isDrowed? divData.disableIconUrl :divData.enableIconUrl)}  alt={"獎項示意圖"} className={"img-fluid"}/>
                </a>
            </div>   
        </>
    );

};
export default RewardDiv;
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { getBestSellingProducts, getLessSellingProducts } from "../Services/productInfoServices";

import { useStateContext } from "../Context/StateContext";


function Analytics() {

    const navigate = useNavigate();

    const { tokenId } = useStateContext();
    const [date, setDate] = useState(new Date("2022-04-07T13:30:00Z").toISOString());
    const [getBestSelling, setGetBestSelling] = useState("");
    const [responseBest, setResponseBest] = useState("");
    const [getLessSelling, setGetLessSelling] = useState("");
    const [responseLess, setResponseLess] = useState("");

    const handleDevolverClick = () => {
        navigate("/administrador/home");
      };

    useEffect(() => {
        async function updateGraphics() {
            //getBestSellingProducts
            const responseBest = await getBestSellingProducts({
                date_to_analize: date,
            }, tokenId);
            const tempBest = document.createElement('div');
            tempBest.innerHTML = responseBest
            const containerElementBest = (tempBest.querySelector('.container')).innerHTML;            
            setGetBestSelling(containerElementBest);
            setResponseBest(responseBest)

            //getLessSellingProducts
            const responseLess = await getLessSellingProducts({
                date_to_analize: date,
            }, tokenId);
            console.log(responseLess.chart);
            const tempLess = document.createElement('div');
            tempLess.innerHTML = responseLess.chart
            const containerElementLess = (tempLess.querySelector('.container')).innerHTML;            
            setGetLessSelling(containerElementLess);
            setResponseLess(responseLess.chart);
        };
        updateGraphics();
      }, [ date ]);


    useEffect(() => {
        const div = document.createElement('div');
        div.innerHTML = responseBest;
        const scripts = div.querySelectorAll('script');
        if(scripts.length !== 0){
            const scriptContent = scripts[1].innerHTML;
            eval(scriptContent);
        }
    }, [getBestSelling]);


    useEffect(() => {
        const div = document.createElement('div');
        div.innerHTML = responseLess;
        const scripts = div.querySelectorAll('script');
        if(scripts.length !== 0){
            const scriptContent = scripts[1].innerHTML;
            eval(scriptContent);
        }
    }, [getLessSelling]);


    return (
        <div>
             <button className="primary-button" onClick={handleDevolverClick}  style={{
                position: "fixed",
                top: 120,
                left: 60,
                backgroundColor: "#DB1A1A"
                }}>
                Atras
             </button>
            <div>
                <label for="date">Selecciona una fecha:</label>
                <input type="date" id="date" value={date} onChange={(event) => {
                                                            const selectedDate = new Date(event.target.value);
                                                            const utcDate = selectedDate.toISOString();
                                                            setDate(utcDate);
                                                        }}>
                </input>
            </div>
            <div className="analytics-container analytics-scroll">
                <br />
                <br />
                <section style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <br />
                    <br />
                    <div>
                        <div dangerouslySetInnerHTML={{ __html: getBestSelling }} />
                        <div dangerouslySetInnerHTML={{ __html: getLessSelling }} />
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Analytics;

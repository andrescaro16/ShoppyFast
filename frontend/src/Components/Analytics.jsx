import React, { useEffect, useState } from "react";
import { getBestSellingProducts } from "../Services/productInfoServices";
import { useNavigate } from "react-router-dom";

import { useStateContext } from "../Context/StateContext";


function Analytics() {

    const navigate = useNavigate();

    const { tokenId } = useStateContext();
    const [date, setDate] = useState(new Date("2022-04-07T13:30:00Z").toISOString());
    const [getBestSelling, setGetBestSelling] = useState("");
    const [responseData, setResponseData] = useState("");
    
    const handleDevolverClick = () => {
        navigate("/administrador/home");
      };

    useEffect(() => {
        async function updateGraphic() {
            console.log(tokenId);
            const responseData = await getBestSellingProducts({
                date_to_analize: date,
            }, tokenId);
            const tempContainer = document.createElement('div');
            tempContainer.innerHTML = responseData
            const containerElement = (tempContainer.querySelector('.container')).innerHTML;            
            setGetBestSelling(containerElement);
            setResponseData(responseData)
        };
        updateGraphic();
      }, [ date ]);


    useEffect(() => {
        const div = document.createElement('div');
        div.innerHTML = responseData;
        const scripts = div.querySelectorAll('script');
        console.log(getBestSelling)
        if(scripts.length !== 0){
            const scriptContent = scripts[1].innerHTML;
            eval(scriptContent);
        }
    }, [getBestSelling]);


    return (
        
        <div className="analytics-container analytics-scroll analytics-chart">
            <button className="primary-button" onClick={handleDevolverClick}  style={{
          position: "fixed",
          top: 120,
          left: 60,
          backgroundColor: "#DB1A1A"
        }}>
        Atras
      </button>
            <br />
            <br />
            <section style={{ display: "grid", justifyContent: "center" }}>
                <div>
                    <label for="date">Selecciona una fecha:</label>
                    <input type="date" id="date" value={date} onChange={(event) => {
                                                                const selectedDate = new Date(event.target.value);
                                                                const utcDate = selectedDate.toISOString();
                                                                setDate(utcDate);
                                                            }}>
                    </input>
                </div>
                <br />
                <br />
                <div>
                    <div dangerouslySetInnerHTML={{ __html: getBestSelling }} />
                </div>
            </section>
        </div>
    );
}

export default Analytics;
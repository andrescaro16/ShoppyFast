import React, { useEffect, useState } from "react";
import { getBestSellingProducts } from "../Services/productInfoServices";
import * as echarts from 'echarts';


function Analytics() {

    const [date, setDate] = useState(new Date("2022-04-07T13:30:00Z").toISOString());
    const [getBestSelling, setGetBestSelling] = useState("");
    const [responseData, setResponseData] = useState("");
    

    useEffect(() => {
        async function updateGraphic() {
            
            const responseData = await getBestSellingProducts({
                date_to_analize: date,
            });
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
        console.log("dfadfasd")
        const scripts = div.querySelectorAll('script');
        console.log(getBestSelling)
        if(scripts.length !== 0){
            console.log(scripts)
            const scriptContent = scripts[1].innerHTML;
            console.log(scriptContent)
            eval(scriptContent);
        }
    }, [getBestSelling]);

    return (
        <section style={{ display: "flex", justifyContent: "center" }}>
            <div>
                <label for="date">Selecciona una fecha:</label>
                <input type="date" id="date" value={date} onChange={(event) => {
                                                            const selectedDate = new Date(event.target.value); // crea un objeto Date a partir del valor del input
                                                            const utcDate = selectedDate.toISOString(); // formatea la fecha como una cadena UTC
                                                            setDate(utcDate); // actualiza el estado con la fecha en formato UTC
                                                        }}>
                </input>
            </div>

            <div>
                <div dangerouslySetInnerHTML={{ __html: getBestSelling }} />
            </div>
        </section>
    );
}

export default Analytics;

import React, { useEffect, useState } from "react";
import { getBestSellingProducts } from "../Services/productInfoServices";
import * as echarts from 'echarts';


function Analytics() {

    const [date, setDate] = useState(new Date("2022-04-07T13:30:00Z").toISOString());
    const [getBestSelling, setGetBestSelling] = useState("");
    const [data, setData] = useState("");


    useEffect(() => {
        async function updateGraphic() {
            setGetBestSelling(await getBestSellingProducts({
                date_to_analize: date,
            }));
        };
        updateGraphic();
      }, [ date ]);


    useEffect(() => {
        setData(getBestSelling.slice(208, -16))
        console.log(getBestSelling)
    }, [getBestSelling]);


/*     useEffect(() => {
        const chartElement = document.getElementById("chart");
        const chart = echarts.init(chartElement);
        
        
        const option = JSON.parse(
            getBestSelling
            .replace(/\n/g, "")
            .match(/let option_MyEEfKgQdSGr = ({.*})/)[1]
        );
        
        // configura y renderiza el gráfico
        chart.setOption();    
    
        // devuelve una función para limpiar el gráfico cuando el componente se desmonte
        return () => chart.dispose();
      }, [getBestSelling]); */

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
                {/* <div id="chart" style={{ width: "900px", height: "500px" }}></div> */}
                <div dangerouslySetInnerHTML={{ __html: data }} />

{/*                 <div>{eval(`
    "use strict";
    let goecharts_UUejPGJbSiTY = echarts.init(document.getElementById('UUejPGJbSiTY'), "white");
    let option_UUejPGJbSiTY = {"color":["#5470c6","#91cc75","#fac858","#ee6666","#73c0de","#3ba272","#fc8452","#9a60b4","#ea7ccc"],"dataset":{"source":null},"legend":{"show":true,"type":"","right":"80px"},"series":[{"name":"Productos","type":"bar","smooth":false,"connectNulls":false,"showSymbol":false,"waveAnimation":false,"renderLabelForZeroData":false,"selectedMode":false,"animation":false,"data":[{},{},{},{},{},{},{}]}],"title":{"text":"Productos mas vendidos cada dia","subtext":"Pasa el mouse encima de cada vela para obtener mas informacion"},"tooltip":{"show":true},"xAxis":[{"data":["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]}],"yAxis":[{}]}
;
    
	let action_UUejPGJbSiTY = {"areas":{},"type":""}
;
    
    goecharts_UUejPGJbSiTY.setOption(option_UUejPGJbSiTY);
 	goecharts_UUejPGJbSiTY.dispatchAction(action_UUejPGJbSiTY);`)}</div> */}
            </div>
        </section>
    );
}

export default Analytics;

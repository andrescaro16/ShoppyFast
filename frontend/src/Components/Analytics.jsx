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
    
    const [unsoldProducts, setUnsoldProducts] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);

    const days = {
        0: "Lunes",
        1: "Martes",
        2: "Miercoles",
        3: "Jueves",
        4: "Viernes",
        5: "Sabado",
        6: "Domingo",
    }

    const handleDaySelect = (day) => {
      setSelectedDay(day);
    };

    const handleDevolverClick = () => {
        navigate("/administrador/home");
    };

    const formatDate = (date) => {
        var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
        if (month.length < 2) 
          month = '0' + month;
        if (day.length < 2) 
          day = '0' + day;
        return [year, month, day].join('-');
    }

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
            console.log(responseLess);
            const tempLess = document.createElement('div');
            tempLess.innerHTML = responseLess.chart
            const containerElementLess = (tempLess.querySelector('.container')).innerHTML;            
            setGetLessSelling(containerElementLess);
            setResponseLess(responseLess.chart);

            //unsoldProducts
            setUnsoldProducts(responseLess.unsold_products);
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

    useEffect(() => {console.log(unsoldProducts)}, [unsoldProducts]);


    return (
        <div id="analytics-elements-container">
             <button className="primary-button" onClick={handleDevolverClick}  style={{
                position: "relative",
                top: 15,
                left: 25,
                backgroundColor: "#DB1A1A"
                }}>
                Atras
             </button>

            <div className="analytics-container">

                <div id="date-analytics">
                    <label for="date">Selecciona una fecha:</label>
                    <input type="date" id="date" value={date} onChange={(event) => {
                                                                const selectedDate = new Date(event.target.value);
                                                                const utcDate = selectedDate.toISOString();
                                                                setDate(utcDate);
                                                            }}>
                    </input>
                </div>

                <section id="graphics-container">

                    <div dangerouslySetInnerHTML={{ __html: getBestSelling }} />
                    <div dangerouslySetInnerHTML={{ __html: getLessSelling }} />
                    <div>
                        <div style={{position: "relative"}}>
                            <div className="unsold-products-title">
                                <h5><b>Productos sin ventas</b></h5>
                                <h5>Semana del {formatDate(date)}</h5>
                            </div>
                        </div>
                        <div className="days">
                        {Object.keys(days).map((day) => (
                            <button
                            key={day}
                            onClick={() => handleDaySelect(day)}
                            className={selectedDay === day ? 'selected' : ''}
                            >
                            {days[day]}
                            </button>
                        ))}
                        </div>
                        <div id="report-container">
                            {selectedDay !== null && (
                            <div className="table-analytics">
                                <h2>{days[selectedDay]}</h2>
                                {unsoldProducts[selectedDay] === null ? (
                                <p>No se vendieron productos este día</p>
                                ) : (
                                unsoldProducts[selectedDay].map((product) => (
                                    <div key={product.id} className="product">
                                        <span className="id"><b>ID:</b> <span className="gray-text">{product.id}</span></span>
                                        <span className="name"><b>Nombre:</b> <span className="gray-text">{product.name}</span></span>
                                        <span className="category"><b>Categoría:</b> <span className="gray-text">{product.category}</span></span>
                                    </div>
                                ))
                                )}
                            </div>
                            )}
                        </div>
                    </div>
                    
                </section>
            </div>
        </div>
    );
}

export default Analytics;

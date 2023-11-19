import { useEffect, useState } from "react"

const WeatherApp = () => {

    const [temp, setTemp] = useState('');
    const [desc, setDesc] = useState('');
    const [icon, setIcon] = useState('');
    const [isReady, setReady] = useState(false);

    const apikey = `f44a41be32b914efc7b970d353894307`;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=${apikey}`;

    useEffect(() => {

        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                setTemp(data.main.temp);
                setDesc(data.weather[0].main);
                setIcon(data.weather[0].icon);
                setReady(true);
            })
            .catch(e => console.log(e));

    }, []);

    if (isReady) {
        return (
            <div>
                <p>Temperature: {temp}</p>
                <p>Description: {desc}</p>
                <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="Weather Icon" />
            </div>
        )

    } else {

        return (
            <div>
                Loading...
            </div>
        )

    }
}

export default WeatherApp

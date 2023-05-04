import React from 'react';
import { useLocation } from 'react-router-dom';

function Waves() {

    let location = useLocation();

    return (
        <div className='waves-container'>

            <svg width="100%" height="100%" id="svg" viewBox="0 0 1440 590" xmlns="http://www.w3.org/2000/svg" class="transition duration-300 ease-in-out delay-150" className="waves" style={{ display: location.pathname === '/' ? 'block' : 'none' }}>
            <defs><linearGradient id="gradient" x1="48%" y1="0%" x2="52%" y2="100%"><stop offset="5%" stop-color="#009ec9"></stop><stop offset="95%" stop-color="#8ED1FC"></stop></linearGradient></defs><path d="M 0,600 C 0,600 0,150 0,150 C 95.38755980861242,166.92822966507177 190.77511961722485,183.85645933014354 288,193 C 385.22488038277515,202.14354066985646 484.2870813397129,203.50239234449762 581,190 C 677.7129186602871,176.49760765550238 772.0765550239234,148.13397129186603 877,132 C 981.9234449760766,115.86602870813398 1097.4066985645934,111.96172248803829 1193,117 C 1288.5933014354066,122.03827751196171 1364.2966507177034,136.01913875598086 1440,150 C 1440,150 1440,600 1440,600 Z" stroke="none" stroke-width="0" fill="url(#gradient)" fill-opacity="0.4" class="transition-all duration-300 ease-in-out delay-150 path-0" transform="rotate(-180 720 300)"></path>
            <defs><linearGradient id="gradient" x1="48%" y1="0%" x2="52%" y2="100%"><stop offset="5%" stop-color="#009ec9"></stop><stop offset="95%" stop-color="#8ED1FC"></stop></linearGradient></defs><path d="M 0,600 C 0,600 0,300 0,300 C 87.59808612440187,282.01913875598086 175.19617224880375,264.0382775119617 275,275 C 374.80382775119625,285.9617224880383 486.8133971291867,325.86602870813397 595,324 C 703.1866028708133,322.13397129186603 807.5502392344498,278.4976076555024 896,282 C 984.4497607655502,285.5023923444976 1056.9856459330144,336.14354066985646 1145,347 C 1233.0143540669856,357.85645933014354 1336.5071770334928,328.92822966507174 1440,300 C 1440,300 1440,600 1440,600 Z" stroke="none" stroke-width="0" fill="url(#gradient)" fill-opacity="0.53" class="transition-all duration-300 ease-in-out delay-150 path-1" transform="rotate(-180 720 300)"></path>
            <defs><linearGradient id="gradient" x1="48%" y1="0%" x2="52%" y2="100%"><stop offset="5%" stop-color="#009ec9"></stop><stop offset="95%" stop-color="#8ED1FC"></stop></linearGradient></defs><path d="M 0,600 C 0,600 0,450 0,450 C 91.15789473684208,429.5980861244019 182.31578947368416,409.19617224880386 293,418 C 403.68421052631584,426.80382775119614 533.8947368421053,464.8133971291866 620,476 C 706.1052631578947,487.1866028708134 748.1052631578947,471.55023923444975 839,474 C 929.8947368421053,476.44976076555025 1069.6842105263156,496.9856459330143 1178,496 C 1286.3157894736844,495.0143540669857 1363.157894736842,472.50717703349284 1440,450 C 1440,450 1440,600 1440,600 Z" stroke="none" stroke-width="0" fill="url(#gradient)" fill-opacity="1" class="transition-all duration-300 ease-in-out delay-150 path-2" transform="rotate(-180 720 300)"></path></svg>
        
            <div className='person-image-waves' style={{ display: location.pathname === '/' ? 'flex' : 'none' }}>
                <img src="https://i.ibb.co/wLWpHg6/retrato-joven-feliz-1.jpg" alt="Person on phone" class="clip-svg" />
                <svg viewBox="0 0 398.6 435.4" width="0" height="0">
                    <clipPath id="blob1" clipPathUnits="objectBoundingBox" transform="scale(0.002508, 0.002296)">
                        <path class="st0" d="M332.3,48.8c32.6,18.1,58.5,49.4,64.7,83.7c6.3,34.3-7.1,71.5-15.8,107.1c-8.6,35.7-12.6,69.7-26,108.4
                            c-13.5,38.6-36.5,81.9-68,86.9c-31.4,5-71.5-28.3-117.1-41.8c-45.7-13.6-97.1-7.5-123.9-28.3c-26.7-20.8-28.9-68.5-35-115.4
                            c-6.2-46.8-16.4-92.6-8-138c8.3-45.3,35.3-90,74.7-105s91.3-0.3,136.9,9.6C260.4,25.8,299.7,30.6,332.3,48.8z"/>
                    </clipPath>
                </svg>
                <div>
                    <h1 className='waves-title'>Olvida las filas</h1>
                    <h1 className='waves-title'>Paga en un click</h1>
                </div>
            </div>

        </div>
  )
}

export default Waves;
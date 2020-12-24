import React from 'react';
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import * as loading from "../../components/loading.json"

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
};

const Loader = (props) => (
  <span>
    {
      props.progress && (
        <FadeIn>
            <h3 className="text-center text-dark text-uppercase ls-2 pt-md-7">Menyiapkan Data</h3>
            <div className="d-flex justify-content-center align-items-center">
                <Lottie options={defaultOptions} height={120} width={120} />
            </div>
        </FadeIn>
        )
    }
    { props.completed && (
        <div className="text-center">
            <h5 className="display-4 text-dark text-uppercase" >Data Habis!</h5>
        </div>
        )
    }
  </span>
);

export default Loader;

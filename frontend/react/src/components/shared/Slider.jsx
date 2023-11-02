import { Box, Container, Image, Stack, Wrap } from "@chakra-ui/react";
import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { sliderData } from "../../services/data";

export default class SimpleSlider extends Component {
    render() {

      const settings = {
        arrows: false,
        lazyLoad: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        appendDots: dots => (
          <ul>
            {dots}
          </ul>
        )
      };

      return (
        <Container>
          <Slider {...settings}>
            {sliderData.map((item, index) => (
                <Container key={index}
                  height={460}
                  maxHeight={600}
                >
                  <Image
                    id={item.id}
                    alt={item.alt}
                    src={item.src}
                  />
                  <h1 className="slider-title">{item.title}</h1>
                  <p className="slider-text">{item.text}</p>
                </Container>
            ))}
          </Slider>
        </Container>
      );
    }
  }
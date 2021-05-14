const setSlides = ({ breakpoint, show, scroll, init, infinite, speed }) => {
  return {
    breakpoint,
    settings: {
      slidesToShow: show,
      slidesToScroll: scroll,
      initialSlide: init,
      infinite,
      speed,
    },
  };
};

const res600 = {
  breakpoint: 600,
  settings: {
    slidesToShow: 1,
    slidesToScroll: 1,
  },
};

const res1024 = {
  breakpoint: 1024,
  settings: {
    slidesToShow: 2,
    slidesToScroll: 2,
    initialSlide: 0,
    infinite: true,
  },
};

const res1224 = {
  breakpoint: 1224,
  settings: {
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    infinite: true,
  },
};

const res1440 = {
  breakpoint: 1440,
  settings: {
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    infinite: true,
  },
};

export const settings4 = {
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [res1440, res1224, res1024, res600],
};

export const settings5 = {
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 5,
  initialSlide: 0,
  responsive: [res1224, res1024, res600],
};

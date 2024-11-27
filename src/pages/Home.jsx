import "../style/home.css";
import Slider from "react-slick";
import { useEffect, useRef, useState } from "react";

function Home() {
  const images = [
    "https://invitato.net/test-product-engineer/static/1-2b43ea516254cdff99c88a7fce90ae98.jpg",
    "https://invitato.net/test-product-engineer/static/4-3943e72cf6bb4fe685c5917ea1d1cac4.jpg",
    "https://invitato.net/test-product-engineer/static/5-ffa38a07e15195800fbcc590cb50b2d0.jpg",
  ];

  const [isContentOpen, setIsContentOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [loadedImages, setLoadedImages] = useState({});
  const audioRef = useRef(null);
  let sliderRef = useRef(null);

  const handleOpenClick = () => {
    setIsContentOpen(true);
    audioRef.current.play();
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prevImage) => {
        const currentIndex = images.indexOf(prevImage);
        const nextIndex = (currentIndex + 1) % images.length;
        return images[nextIndex];
      });
    }, 3000);

    return () => clearInterval(intervalId);
  }, [images]);

  const handleScrollToSection = () => {
    document.querySelector(".opening-section").scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleImageLoad = (index) => {
    setLoadedImages((prevState) => ({
      ...prevState,
      [index]: true,
    }));
  };

  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0",
    slidesToShow: 3,
    speed: 500,
    dots: false,
    lazyLoad: true,
    slidesToScroll: 1,
    initialSlide: 2,
  };

  return (
    <>
      <audio ref={audioRef} src="/sound.mp3" preload="auto" />
      <div className="home">
        <div className="row">
          <div className="col-lg-7 component-1 text-white p-0">
            <div className="gradient">
              <div className="group-1">
                <p className="poppins announcement mb-4">
                  WEDDING ANNOUNCEMENT
                </p>
                <h1 className="butler wedding-name">Tiffany & Jared</h1>
                <p className="fst-italic quotes">
                  "Aku ingin mencintaimu dengan sederhana; dengan kata yang tak
                  sempat diucapkan kayu kepada api yang menjadikannya abu. Aku
                  ingin mencintaimu dengan sederhana; dengan isyarat yang tak
                  sempat disampaikan awan kepada hujan yang menjadikannya
                  tiada." <br />— Sapardi Djoko Damono
                </p>
              </div>
            </div>

            <div className="line"></div>
          </div>
          {!isContentOpen ? (
            <div className="col-lg-5 component-2 p-0">
              <div className="card bg-transparent border-0 text-white mt-5">
                <div className="card-body text-center">
                  <div className="card-title poppins announcement">
                    WEDDING ANNOUNCEMENT
                  </div>
                  <div className="card-body">
                    <div className="butler wedding-name">Tiffany & Jared</div>
                    <div className="hastag fst-italic">#TImetoshaRE</div>

                    <button onClick={handleOpenClick} className="btn-open mt-5">
                      Open
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="col-lg-5 p-0">
              <div className="content-container">
                <div className="scroll-content">
                  <div
                    className="content-item welcome-section"
                    style={{
                      background: `linear-gradient(rgba(50, 48, 48, 0.5), rgba(50, 48, 48, 0.5)), url('${currentImage}')`,
                    }}
                  >
                    <div className="card bg-transparent border-0 text-white mt-5">
                      <div className="card-body text-center">
                        <div className="card-title poppins announcement">
                          WEDDING ANNOUNCEMENT
                        </div>
                        <div className="card-body">
                          <div className="butler wedding-name">
                            Tiffany & Jared
                          </div>
                          <div className="hastag fst-italic">#TImetoshaRE</div>
                        </div>
                      </div>
                      <div
                        className="text-end me-5"
                        onClick={handleScrollToSection}
                      >
                        <button className="btn-scroll">
                          Scroll to begin
                          <i className="fas fa-chevron-down ms-2"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="content-item opening-section">
                    <div className="card bg-transparent border-0 mt-5">
                      <div className="card-body text-center">
                        <div className="card-title poppins opening-title">
                          DEAR MR-MRS-MS,
                          <br />
                          Family & Friends
                        </div>
                        <div className="card-body">
                          <div className="butler opening-wedding-name">
                            Welcome to Tiffany & Jared’s Wedding Website
                          </div>
                          <div className="quotes fst-italic mt-3">
                            Together with joyful hearts and the grace of God, we
                            joyfully announce the upcoming of our marriage.
                          </div>
                        </div>
                      </div>

                      {/* Slider */}

                      <div className="slider-container mt-2">
                        <Slider
                          ref={(slider) => {
                            sliderRef = slider;
                          }}
                          {...settings}
                        >
                          {images.map((image, index) => (
                            <div key={index} style={{ padding: "0 5px" }}>
                              {!loadedImages[index] && (
                                <div
                                  style={{
                                    width: "100%",
                                    height: "250px",
                                    backgroundColor: "#ccc",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    color: "#555",
                                  }}
                                >
                                  Loading...
                                </div>
                              )}
                              <img
                                src={image}
                                alt={`Slide ${index}`}
                                style={{
                                  width: "100%",
                                  height: "250px",
                                  objectFit: "cover",
                                  display: loadedImages[index]
                                    ? "block"
                                    : "none",
                                  borderRadius: "0",
                                }}
                                onLoad={() => handleImageLoad(index)}
                              />
                            </div>
                          ))}
                        </Slider>

                        <div className="mt-3 mb-5 text-end">
                          <button className="btn-open me-2" onClick={previous}>
                            <i className="fas fa-chevron-left"></i>{" "}
                          </button>
                          <button className="btn-open me-2" onClick={next}>
                            <i className="fas fa-chevron-right"></i>{" "}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;

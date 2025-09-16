/*
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}

.image-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  position: relative;
}

.slide {
  width: 100px;
  height: 100px;
  display: none;
}

.slideImage {
  width: 100%;
}

.next {
  position: absolute;
  top: 20%;
  right: 0;
}

.prev {
  position: absolute;
  top: 20%;
  left: 0;
}

.active {
  display: block;
  animation-name: fade;
  animation-duration: 1.5s;
}


.modal-backdrop {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  top: 0;
  left: 0;
}

.modal-wrapper {
  padding: 10px;
  margin: 10px auto;
  box-shadow: 0px 2px 6px #000;
  position: fixed;
  width: 100%;
  max-width: 500px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 11111;
  background-color: #fff;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.modal-close {
  text-align: center;
  font-size: 1.2em;
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: gray;
  line-height: 1.7em;
  color: #fff;
}
*/
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Modal({show, children, title, onClose }) {
	return (
		show && (
			<>
			<div className="modal-backdrop" onClick={onClose} />
			<div className="modal-wrapper">
			  <div className="modal-content">
				<div className="modal-header">
				  <div className="modal-title">{title}</div>
				  <div onClick={onClose} className="modal-close">
					X
				  </div>
				</div>
				<div className="modal-body">{children}</div>
			  </div>
			</div>
			</>
		)
	) 
}

function Slider({ images, active, setActive }) {
	const Slide = ({ url, active }) => {
		console.log("a", active)
		return (
			<div className={`slide ${active ? 'active' : ''}`}>
				<img src={url} className="slideImage" />
			</div>
		)
	}

	const onNext = () => {
		if (active < images.length) {
			setActive(active + 1)
		}
	}

	const onPrev = () => {
		if (active > 0) {
			setActive(active - 1)
		}
	}

	return (
		<div className="image-container">
			{images.map((image, index) => (
				<Slide key={index} url={image.image_url} active={active == index} />
			))}

			<div className="navigation">
				<div className="prev" onClick={onPrev}>
					{'<'}
				</div>
				<div className="next" onClick={onNext}>
					{'>'}
				</div>
			</div>
		</div>
	)
}

function App() {
	const [active, setActive] = useState(0);
	const [show, setShow] = useState(true);
	const images = [
		{
			image_url:
				'https://img.freepik.com/free-photo/young-female-jacket-shorts-presenting-comparing-something-looking-confident-front-view_176474-37521.jpg?w=1800&t=st=1693037944~exp=1693038544~hmac=97e967909706f9b73b4b47d521acf54806f4b9b3efab6196bc8a69f07efff554',
			caption: 'Image 1'
		},
		{
			image_url:
				'https://img.freepik.com/free-photo/girl-grey-shirt-showing-something-her-hand_144627-51099.jpg?t=st=1693037931~exp=1693038531~hmac=63713e5a5cf2d23f53ca82b9996ad224ac6e92d0275a53b6debbe6523d7df020',
			caption: 'Image 2'
		},
		{
			image_url:
				'https://img.freepik.com/free-photo/young-lady-shirt-jacket-making-scales-gesture-looking-cheerful-front-view_176474-85195.jpg?t=st=1693037931~exp=1693038531~hmac=2f83b6689538e4056912c96f448163e9ef10998f48f671b7e50279f81611fbe6',
			caption: 'Image 3'
		},
		{
			image_url:
				'https://img.freepik.com/free-photo/girl-wide-opening-hands-giving-explanation-high-quality-photo_144627-60466.jpg?w=1800&t=st=1693038021~exp=1693038621~hmac=d4520cd86b2aea3e5dda765ede05bb53d70e18a574756d0f41a6806fe325d26d',
			caption: 'Image 4'
		},
		{
			image_url:
				'https://img.freepik.com/free-photo/young-lady-shirt-jacket-making-scales-gesture-looking-cheerful-front-view_176474-85195.jpg?t=st=1693037931~exp=1693038531~hmac=2f83b6689538e4056912c96f448163e9ef10998f48f671b7e50279f81611fbe6',
			caption: 'Image 5'
		},
		{
			image_url:
				'https://img.freepik.com/free-photo/girl-wide-opening-hands-giving-explanation-high-quality-photo_144627-60466.jpg?w=1800&t=st=1693038021~exp=1693038621~hmac=d4520cd86b2aea3e5dda765ede05bb53d70e18a574756d0f41a6806fe325d26d',
			caption: 'Image 6'
		}
	]
    const handleClick = (index) => {
        setActive(index);
        setShow(true);
      };
    
      const onClose = () => {
        setShow(false);
      };
	return (
		<>
			<Modal show={true} onClose={() => setShow(!show)}>
				<Slider images={images} setActive={setActive} active={active} />
			</Modal>
            <div className="image-list">
        {images.map((e, i) => (
          <div
            className={i === active ? "active" : ""}
            onClick={() => handleClick(i)}
            key={e.caption}
          >
            <img src={e.image_url} alt={e.caption} />
          </div>
        ))}
      </div>
		</>
	)
}

export default App

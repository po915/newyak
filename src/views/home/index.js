import { React, useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";
import { Link, animateScroll as scroll } from "react-scroll";

import "bootstrap/dist/css/bootstrap.min.css";
import "./icofont/icofont.min.css";
import "./boxicons/css/boxicons.min.css";
import "./style.css";

import about from "@src/assets/img/about.jpg";

export default () => {
	useEffect(() => {
		AOS.init({ duration: 1000 });
	}, []);
	// function faqOpen () {
	//   alert()
	// }
	const faqOpen = (event) => {
		event.target.classList.toggle('collapsed');
		// alert(event.target.value);
	};
	return (
		<>
			<header id="header" className="fixed-top">
				<div className="container d-flex align-items-center" style={{ display: "flex", padding: "0px 30px" }}>
					<h1 className="logo mr-auto">
						<a href="index.html">
							Yakkaz<span>.</span>
						</a>
					</h1>
					<nav className="nav-menu d-none d-lg-block">
						<ul>
							<li className="active">
								<Link to="hero" activeClass="active" spy={true} smooth={true} offset={-30} duration={500}>
									Home
								</Link>
							</li>
							<li>
								<Link to="about" activeClass="active" spy={true} smooth={true} offset={-30} duration={500}>
									About
								</Link>
							</li>
							<li>
								<Link to="faq" activeClass="active" spy={true} smooth={true} offset={-30} duration={500}>
									FAQ
								</Link>
							</li>
							<li>
								<Link to="contact" activeClass="active" spy={true} smooth={true} offset={-30} duration={500}>
									Contact
								</Link>
							</li>
							<li>
								<a href="/login">Login</a>
							</li>
						</ul>
					</nav>
				</div>
			</header>

			<section id="hero" className="d-flex align-items-center">
				<div className="container" data-aos="zoom-out" data-aos-delay="100">
					<h1>
						Welcome to <span>Yakkaz</span>
					</h1>
					<h2>We are the ambitious rival of facebook.</h2>
					<div className="d-flex">
						<a href="/register" className="btn-get-started scrollto">
							JOIN US
						</a>
					</div>
				</div>
			</section>

			<section id="about" className="about bg-white">
				<div className="container" data-aos="fade-up">
					<div className="section-title">
						<h2>About</h2>
						<h3>
							Find Out More <span>About Us</span>
						</h3>
						<p>Ut possimus qui ut temporibus culpa velit eveniet modi omnis est adipisci expedita at voluptas atque vitae autem.</p>
					</div>
					<div className="row">
						<div className="col-lg-6" data-aos="zoom-out" data-aos-delay="100">
							<img src={about} className="img-fluid" alt="About" />
						</div>
						<div className="col-lg-6 pt-4 pt-lg-0 content d-flex flex-column justify-content-center" data-aos="fade-up" data-aos-delay="100">
							<h3>Voluptatem dignissimos provident quasi corporis voluptates sit assumenda.</h3>
							<p className="font-italic">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
							<ul>
								<li>
									<i className="bx bx-store-alt"></i>
									<div>
										<h5>Ullamco laboris nisi ut aliquip consequat</h5>
										<p>Magni facilis facilis repellendus cum excepturi quaerat praesentium libre trade</p>
									</div>
								</li>
								<li>
									<i className="bx bx-images"></i>
									<div>
										<h5>Magnam soluta odio exercitationem reprehenderi</h5>
										<p>Quo totam dolorum at pariatur aut distinctio dolorum laudantium illo direna pasata redi</p>
									</div>
								</li>
							</ul>
							<p>
								Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
								Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
							</p>
						</div>
					</div>
				</div>
			</section>

			<section id="faq" className="faq section-bg">
				<div className="container" data-aos="fade-up">
					<div className="section-title">
						<h2>F.A.Q</h2>
						<h3>
							Frequently Asked <span>Questions</span>
						</h3>
						<p>Ut possimus qui ut temporibus culpa velit eveniet modi omnis est adipisci expedita at voluptas atque vitae autem.</p>
					</div>

					<ul className="faq-list" data-aos="fade-up" data-aos-delay="100">
						<li>
							<a data-toggle="collapse" className="" href="#faq1" value="wef" onClick={faqOpen}>
								Non consectetur a erat nam at lectus urna duis? <i className="icofont-simple-up"></i>
							</a>
							<div id="faq1" className="collapse show" data-parent=".faq-list">
								<p>
									Feugiat pretium nibh ipsum consequat. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida. Venenatis lectus magna fringilla urna porttitor rhoncus
									dolor purus non.
								</p>
							</div>
						</li>

						<li>
							<a data-toggle="collapse" href="#faq2" className="collapsed">
								Feugiat scelerisque varius morbi enim nunc faucibus a pellentesque? <i className="icofont-simple-up"></i>
							</a>
							<div id="faq2" className="collapse" data-parent=".faq-list">
								<p>
									Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id interdum velit laoreet id donec ultrices. Fringilla phasellus faucibus scelerisque
									eleifend donec pretium. Est pellentesque elit ullamcorper dignissim. Mauris ultrices eros in cursus turpis massa tincidunt dui.
								</p>
							</div>
						</li>

						<li>
							<a data-toggle="collapse" href="#faq3" className="collapsed">
								Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi? <i className="icofont-simple-up"></i>
							</a>
							<div id="faq3" className="collapse" data-parent=".faq-list">
								<p>
									Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Faucibus pulvinar elementum integer enim. Sem nulla pharetra diam sit amet nisl suscipit.
									Rutrum tellus pellentesque eu tincidunt. Lectus urna duis convallis convallis tellus. Urna molestie at elementum eu facilisis sed odio morbi quis
								</p>
							</div>
						</li>

						<li>
							<a data-toggle="collapse" href="#faq4" className="collapsed">
								Ac odio tempor orci dapibus. Aliquam eleifend mi in nulla? <i className="icofont-simple-up"></i>
							</a>
							<div id="faq4" className="collapse" data-parent=".faq-list">
								<p>
									Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id interdum velit laoreet id donec ultrices. Fringilla phasellus faucibus scelerisque
									eleifend donec pretium. Est pellentesque elit ullamcorper dignissim. Mauris ultrices eros in cursus turpis massa tincidunt dui.
								</p>
							</div>
						</li>

						<li>
							<a data-toggle="collapse" href="#faq5" className="collapsed">
								Tempus quam pellentesque nec nam aliquam sem et tortor consequat? <i className="icofont-simple-up"></i>
							</a>
							<div id="faq5" className="collapse" data-parent=".faq-list">
								<p>
									Molestie a iaculis at erat pellentesque adipiscing commodo. Dignissim suspendisse in est ante in. Nunc vel risus commodo viverra maecenas accumsan. Sit amet nisl
									suscipit adipiscing bibendum est. Purus gravida quis blandit turpis cursus in
								</p>
							</div>
						</li>

						<li>
							<a data-toggle="collapse" href="#faq6" className="collapsed">
								Tortor vitae purus faucibus ornare. Varius vel pharetra vel turpis nunc eget lorem dolor? <i className="icofont-simple-up"></i>
							</a>
							<div id="faq6" className="collapse" data-parent=".faq-list">
								<p>
									Laoreet sit amet cursus sit amet dictum sit amet justo. Mauris vitae ultricies leo integer malesuada nunc vel. Tincidunt eget nullam non nisi est sit amet. Turpis
									nunc eget lorem dolor sed. Ut venenatis tellus in metus vulputate eu scelerisque. Pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus
									faucibus. Nibh tellus molestie nunc non blandit massa enim nec.
								</p>
							</div>
						</li>
					</ul>
				</div>
			</section>

			<section id="contact" className="contact bg-white">
				<div className="container" data-aos="fade-up">
					<div className="section-title">
						<h2>Contact</h2>
						<h3>
							<span>Contact Us</span>
						</h3>
						<p>Ut possimus qui ut temporibus culpa velit eveniet modi omnis est adipisci expedita at voluptas atque vitae autem.</p>
					</div>

					<div className="row" data-aos="fade-up" data-aos-delay="100">
						<div className="col-lg-6">
							<div className="info-box mb-4">
								<i className="bx bx-map"></i>
								<h3>Our Address</h3>
								<p>Sydney - Minsk</p>
							</div>
						</div>

						<div className="col-lg-3 col-md-6">
							<div className="info-box  mb-4">
								<i className="bx bx-envelope"></i>
								<h3>Email Us</h3>
								<p>contact@example.com</p>
							</div>
						</div>

						<div className="col-lg-3 col-md-6">
							<div className="info-box  mb-4">
								<i className="bx bx-phone-call"></i>
								<h3>Call Us</h3>
								<p>+1 2345 678 9012</p>
							</div>
						</div>
					</div>

					<div className="row" data-aos="fade-up" data-aos-delay="100">
						<div className="col-lg-12">
							<form action="forms/contact.php" method="post" role="form" className="php-email-form">
								<div className="form-row">
									<div className="col form-group">
										<input type="text" name="name" className="form-control" id="name" placeholder="Your Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
										<div className="validate"></div>
									</div>
									<div className="col form-group">
										<input type="email" className="form-control" name="email" id="email" placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email" />
										<div className="validate"></div>
									</div>
								</div>
								<div className="form-group">
									<input
										type="text"
										className="form-control"
										name="subject"
										id="subject"
										placeholder="Subject"
										data-rule="minlen:4"
										data-msg="Please enter at least 8 chars of subject"
									/>
									<div className="validate"></div>
								</div>
								<div className="form-group">
									<textarea className="form-control" name="message" rows="5" data-rule="required" data-msg="Please write something for us" placeholder="Message"></textarea>
									<div className="validate"></div>
								</div>
								<div className="mb-3">
									<div className="loading">Loading</div>
									<div className="error-message"></div>
									<div className="sent-message">Your message has been sent. Thank you!</div>
								</div>
								<div className="text-center">
									<button type="submit">Send Message</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>

			<footer id="footer">
				<div className="footer-top section-bg">
					<div className="container">
						<div className="row">
							<div className="col-lg-6 col-md-6 footer-contact">
								<h3>
									BizLand<span>.</span>
								</h3>
								<p>
									A108 Adam Street <br />
									New York, NY 535022
									<br />
									United States <br />
									<br />
									<strong>Phone:</strong> +1 5589 55488 55
									<br />
									<strong>Email:</strong> info@example.com
									<br />
								</p>
							</div>

							<div className="col-lg-6 col-md-6 footer-links">
								<h4>Our Social Networks</h4>
								<p>Cras fermentum odio eu feugiat lide par naso tierra videa magna derita valies</p>
								<div className="social-links mt-3">
									<a href="#" className="twitter">
										<i className="bx bxl-twitter"></i>
									</a>
									<a href="#" className="facebook">
										<i className="bx bxl-facebook"></i>
									</a>
									<a href="#" className="instagram">
										<i className="bx bxl-instagram"></i>
									</a>
									<a href="#" className="google-plus">
										<i className="bx bxl-skype"></i>
									</a>
									<a href="#" className="linkedin">
										<i className="bx bxl-linkedin"></i>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="container py-4">
					<div className="copyright">
						&copy; Copyright{" 2021 "}
						<strong>
							<span>Yakkaz</span>
						</strong>
						. All Rights Reserved
					</div>
				</div>
			</footer>
		</>
	);
};

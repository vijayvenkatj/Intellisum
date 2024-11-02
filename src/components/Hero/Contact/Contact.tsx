import { FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub, FaNetworkWired } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="relative bg-stone-950 text-white py-12 px-6" id="contact">
      {/* Contact Info */}
      <h2 className="text-3xl font-semibold text-center mb-8">Contact Me</h2>
      <div className="flex flex-col md:flex-row justify-center space-y-6 md:space-y-0 md:space-x-12 items-center">
        {/* Email */}
        <div className="flex items-center space-x-3">
          <FaEnvelope className="text-gray-100" />
          <span>contact.vijayvenkat@gmail.com</span>
        </div>

        {/* Location */}
        <div className="flex items-center space-x-3">
          <FaMapMarkerAlt className="text-gray-100" />
          <span>Tamilnadu, India</span>
        </div>
      </div>

      {/* Social Icons */}
      <div className="flex justify-center space-x-4 mt-8">
        <a href="https://in.linkedin.com/in/vijayvenkatj" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="text-white hover:text-gray-100 transition duration-300 cursor-pointer" />
        </a>
        <a href="https://github.com/vijayvenkatj" target="_blank" rel="noopener noreferrer">
          <FaGithub className="text-white hover:text-text-gray-100 transition duration-300 cursor-pointer" />
        </a>
        <a href="https://tryhackme.com/r/p/Vijayvenkatj" target="_blank" rel="noopener noreferrer">
          <FaNetworkWired className="text-white hover:text-text-gray-100 transition duration-300 cursor-pointer" />
        </a>
      </div>

      {/* Footer Text */}
      <p className="text-center text-gray-100 mt-6 text-lg">&quot;Thanks for Scrolling&quot;</p>
    </div>
  );
};

export default Contact;
import { FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub, FaNetworkWired } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="relative bg-stone-950 text-white py-12 px-4" id="contact">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Contact Me
        </h2>
        
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 max-w-2xl mx-auto">
          {/* Email */}
          <div className="flex items-center p-3 bg-stone-900/50 rounded-lg hover:bg-stone-800/50 transition-all duration-300 group">
            <div className="p-2 bg-stone-800 rounded-md mr-3">
              <FaEnvelope className="text-lg text-gray-100" />
            </div>
            <span className="text-sm text-gray-100 group-hover:text-white transition-colors duration-300">
              contact.vijayvenkat@gmail.com
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center p-3 bg-stone-900/50 rounded-lg hover:bg-stone-800/50 transition-all duration-300 group">
            <div className="p-2 bg-stone-800 rounded-md mr-3">
              <FaMapMarkerAlt className="text-lg text-gray-100" />
            </div>
            <span className="text-sm text-gray-100 group-hover:text-white transition-colors duration-300">
              Tamilnadu, India
            </span>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center space-x-4 mb-8">
          <a 
            href="https://in.linkedin.com/in/vijayvenkatj" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2.5 bg-stone-800/50 rounded-lg hover:bg-blue-600 transition-all duration-300 hover:-translate-y-1"
          >
            <FaLinkedin className="text-lg" />
          </a>
          <a 
            href="https://github.com/vijayvenkatj" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2.5 bg-stone-800/50 rounded-lg hover:bg-gray-600 transition-all duration-300 hover:-translate-y-1"
          >
            <FaGithub className="text-lg" />
          </a>
          <a 
            href="https://tryhackme.com/r/p/Vijayvenkatj" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2.5 bg-stone-800/50 rounded-lg hover:bg-green-600 transition-all duration-300 hover:-translate-y-1"
          >
            <FaNetworkWired className="text-lg" />
          </a>
        </div>

        {/* Footer Text with subtle divider */}
        <div className="text-center">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-stone-700 to-transparent mx-auto mb-3"></div>
          <span className="text-sm text-gray-400 italic">
            "Thanks for Scrolling"
          </span>
        </div>
      </div>
    </div>
  );
};

export default Contact;
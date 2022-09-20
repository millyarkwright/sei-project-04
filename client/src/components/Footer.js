import { Link } from 'react-router-dom'

const Footer = () => {

  return (
      <footer id="sticky-footer" className="flex-shrink-0 ">
        <div className=" container text-center">
          <Link to="/about" className="">About Us</Link>
        </div>
      </footer>
  )
}

export default Footer
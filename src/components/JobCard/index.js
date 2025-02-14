import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobCard = props => {
  const {jobData} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    rating,
    packagePerAnnum,
    id,
    location,
    title,
  } = jobData

  return (
    <li className="product-item">
      <Link to={`/jobs/${id}`} className="link-item">
        <div className="companyimg-title-rating-container">
          <img
            src={companyLogoUrl}
            className="company-img"
            alt="company logo"
          />
          <div className="title-rating-container">
            <h1 className="job-title">{title}</h1>
            <div className="staricon-rating-container">
              <FaStar className="star-icon" />
              <p className="job-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="joblocation-jobtype-jobpackage-container">
          <div className="joblocation-jobtype-container">
            <div className="job-location-container">
              <IoLocationSharp className="location-icon" />
              <p className="job-location">{location}</p>
            </div>
            <div className="job-location-container">
              <BsBriefcaseFill className="job-icon" />
              <p className="job-type">{employmentType}</p>
            </div>
          </div>
          <p className="job-package">{packagePerAnnum}</p>
        </div>
        <div className="job-description-container">
          <h1 className="description-head">Description</h1>
          <p className="job-description">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}
export default JobCard

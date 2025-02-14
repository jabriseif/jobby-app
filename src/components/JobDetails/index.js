import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill, BsBoxArrowUpRight} from 'react-icons/bs'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetails extends Component {
  state = {
    jobData: {},
    similarJobsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobData()
  }

  formatData = arg => {
    let data = arg
    data = {
      jobDetails: data.job_details,
      similarJobs: data.similar_jobs,
    }
    data.jobDetails = {
      companyLogoUrl: data.jobDetails.company_logo_url,
      companyWebsiteUrl: data.jobDetails.company_website_url,
      employmentType: data.jobDetails.employment_type,
      id: data.jobDetails.id,
      lifeAtCompany: data.jobDetails.life_at_company,
      location: data.jobDetails.location,
      packagePerAnnum: data.jobDetails.package_per_annum,
      rating: data.jobDetails.rating,
      skills: data.jobDetails.skills,
      title: data.jobDetails.title,
      jobDescription: data.jobDetails.job_description,
    }
    data.jobDetails.lifeAtCompany = {
      description: data.jobDetails.lifeAtCompany.description,
      imageUrl: data.jobDetails.lifeAtCompany.image_url,
    }
    data.jobDetails.skills = data.jobDetails.skills.map(eachItem => ({
      imageUrl: eachItem.image_url,
      name: eachItem.name,
    }))
    data.similarJobs = data.similarJobs.map(eachItem => ({
      companyLogoUrl: eachItem.company_logo_url,
      employmentType: eachItem.employment_type,
      id: eachItem.id,
      jobDescription: eachItem.job_description,
      location: eachItem.location,
      rating: eachItem.rating,
      title: eachItem.title,
    }))
    return data
  }

  getJobData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      let updatedData = this.formatData(fetchedData)
      const {similarJobs} = updatedData
      updatedData = updatedData.jobDetails
      this.setState({
        jobData: updatedData,
        similarJobsData: similarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  fetchJobDetails = () => {
    this.getJobData()
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-btn"
        onClick={this.fetchJobDetails}
      >
        Retry
      </button>
    </div>
  )

  renderJobDetailsView = () => {
    const {jobData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
      jobDescription,
    } = jobData
    return (
      <>
        <div className="job-detail-product-item">
          <div className="job-detail-companyimg-title-rating-container">
            <img
              src={companyLogoUrl}
              className="job-detail-company-img"
              alt="job details company logo"
            />
            <div className="job-detail-title-rating-container">
              <h1 className="job-detail-job-title">{title}</h1>
              <div className="job-detail-staricon-rating-container">
                <FaStar className="job-detail-star-icon" />
                <p className="job-detail-job-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-detail-joblocation-jobtype-jobpackage-container">
            <div className="job-detail-joblocation-jobtype-container">
              <div className="job-detail-job-location-container">
                <IoLocationSharp className="job-detail-location-icon" />
                <p className="job-detail-job-location">{location}</p>
              </div>
              <div className="job-detail-job-location-container">
                <BsBriefcaseFill className="job-detail-job-icon" />
                <p className="job-detail-job-type">{employmentType}</p>
              </div>
            </div>
            <p className="job-detail-job-package">{packagePerAnnum}</p>
          </div>
          <div className="job-detail-job-description-container">
            <div className="job-detail-joblocation-jobtype-jobpackage-container description-container">
              <h1 className="job-detail-description-head">Description</h1>
              <a href={companyWebsiteUrl} className="company-website-link">
                Visit <BsBoxArrowUpRight />
              </a>
            </div>
            <p className="job-detail-job-description">{jobDescription}</p>
            <h1 className="job-detail-description-head">Skills</h1>
            <ul className="skills-list-container">
              {skills.map(eachItem => (
                <li className="skill-list-item" key={eachItem.name}>
                  <img
                    src={eachItem.imageUrl}
                    className="skill-img"
                    alt={eachItem.name}
                  />
                  <p className="skill-text">{eachItem.name}</p>
                </li>
              ))}
            </ul>
            <div className="lifeatcompany-container">
              <div className="lifeatcompany-content-container">
                <h1 className="lifeatcompany-description-head">
                  Life at Company
                </h1>
                <p className="lifeatcompany-description">
                  {lifeAtCompany.description}
                </p>
              </div>
              <img
                src={lifeAtCompany.imageUrl}
                className="lifeatcompany-img"
                alt="life at company"
              />
            </div>
          </div>
        </div>
        {this.renderSimilarProducts()}
      </>
    )
  }

  renderSimilarProducts = () => {
    const {similarJobsData} = this.state
    return (
      <>
        <div className="job-detail-product-item job-detail-simliarjobs-container">
          <h1 className="similar-jobs-head">Similar Jobs</h1>
          <ul className="similar-job-list-container">
            {similarJobsData.map(eachItem => (
              <li className="similar-job-item" key={eachItem.id}>
                <div className="companyimg-title-rating-container">
                  <img
                    src={eachItem.companyLogoUrl}
                    className="company-img"
                    alt="similar job company logo"
                  />
                  <div className="title-rating-container">
                    <h1 className="job-title">{eachItem.title}</h1>
                    <div className="staricon-rating-container">
                      <FaStar className="star-icon" />
                      <p className="job-rating">{eachItem.rating}</p>
                    </div>
                  </div>
                </div>
                <div className="job-description-container">
                  <h1 className="description-head">Description</h1>
                  <p className="job-description">{eachItem.jobDescription}</p>
                </div>
                <div className="no-border-joblocation-jobtype-jobpackage-container">
                  <div className="joblocation-jobtype-container">
                    <div className="job-location-container">
                      <IoLocationSharp className="location-icon" />
                      <p className="job-location">{eachItem.location}</p>
                    </div>
                    <div className="job-location-container">
                      <BsBriefcaseFill className="job-icon" />
                      <p className="job-type">{eachItem.employmentType}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-details-container">{this.renderJobDetails()}</div>
      </>
    )
  }
}

export default JobDetails

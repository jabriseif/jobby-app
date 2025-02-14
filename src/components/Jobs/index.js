import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import FiltersGroup from '../FiltersGroup'
import JobCard from '../JobCard'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    profileApiStatus: apiStatusConstants.initial,
    searchInput: '',
    employmentTypeValue: '',
    minimumPackageValue: '',
    profileDetails: '',
  }

  componentDidMount() {
    this.getProducts()
    this.getProfile()
  }

  getProducts = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {employmentTypeValue, searchInput, minimumPackageValue} = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeValue}&minimum_package=${minimumPackageValue}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        jobDescription: eachItem.job_description,
        packagePerAnnum: eachItem.package_per_annum,
        id: eachItem.id,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  getProfile = async () => {
    this.setState({
      profileApiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const profileDetails = fetchedData.profile_details
      const updatedData = {
        profileImageUrl: profileDetails.profile_image_url,
        name: profileDetails.name,
        shortBio: profileDetails.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
        profileApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        profileApiStatus: apiStatusConstants.failure,
      })
    }
  }

  fetchProfile = () => {
    this.getProfile()
  }

  fetchProducts = () => {
    this.getProducts()
  }

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
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
      <button type="button" className="retry-btn" onClick={this.fetchProducts}>
        Retry
      </button>
    </div>
  )

  renderProductsListView = () => {
    const {jobsList} = this.state

    return jobsList.length ? (
      <>
        <div className="all-products-container">
          <ul className="products-list">
            {jobsList.map(eachJob => (
              <JobCard jobData={eachJob} key={eachJob.id} />
            ))}
          </ul>
        </div>
      </>
    ) : (
      <>
        <div className="no-products-view">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
            className="no-products-img"
            alt="no products"
          />
          <h1 className="no-products-heading">No Jobs Found</h1>
          <p className="no-products-description">
            We could not find any jobs. Try other filters.
          </p>
        </div>
      </>
    )
  }

  renderProfileView = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-img" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderProfileFailureView = () => (
    <div className="profile-container profile-failure-container">
      <button className="retry-btn" onClick={this.fetchProfile} type="button">
        Retry
      </button>
    </div>
  )

  renderAllProducts = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderProfile = () => {
    const {profileApiStatus} = this.state

    switch (profileApiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileView()
      case apiStatusConstants.failure:
        return this.renderProfileFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderSearchInput = () => {
    const {searchInput} = this.state
    return (
      <div className="search-input-container">
        <input
          value={searchInput}
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={this.onChangeSearchInput}
        />
        {/* eslint-disable-next-line */}
        <button
          className="search-icon-container"
          onClick={this.onEnterSearchInput}
          type="button"
          data-testid="searchButton"
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  updateMinimumPackageValue = id => {
    this.setState({minimumPackageValue: id}, this.getProducts)
  }

  updateEmploymentTypeValue = list => {
    const checkedElements = list.filter(eachItem => {
      const employmentTypeEle = document.getElementById(
        eachItem.employmentTypeId,
      )
      return employmentTypeEle.checked === true
    })
    const checkedElementsValues = checkedElements.map(
      eachItem => eachItem.employmentTypeId,
    )
    this.setState(
      {employmentTypeValue: checkedElementsValues},
      this.getProducts,
    )
  }

  onEnterSearchInput = () => {
    const {searchInput} = this.state
    this.setState({searchInput}, this.getProducts)
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-filters-container">
          <FiltersGroup
            renderProfile={this.renderProfile}
            updateMinimumPackageValue={this.updateMinimumPackageValue}
            updateEmploymentTypeValue={this.updateEmploymentTypeValue}
          />
          <div className="search-jobs-container">
            {this.renderSearchInput()}
            <div className="all-products-section">
              {this.renderAllProducts()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const FiltersGroup = props => {
  const renderEmploymentTypeList = () =>
    employmentTypesList.map(eachItem => (
      <li className="rating-item" key={eachItem.employmentTypeId}>
        <input
          type="checkbox"
          id={eachItem.employmentTypeId}
          value={eachItem.employmentTypeId}
        />
        <label className="employmentType" htmlFor={eachItem.employmentTypeId}>
          {eachItem.label}
        </label>
      </li>
    ))

  const updateEmploymentId = () => {
    const {updateEmploymentTypeValue} = props
    updateEmploymentTypeValue(employmentTypesList)
  }

  const renderEmploymentFilter = () => (
    <div className="employmenttype-list-container">
      <h1 className="rating-heading">Type of Employment</h1>
      <ul className="ratings-list" onChange={updateEmploymentId}>
        {renderEmploymentTypeList()}
      </ul>
    </div>
  )

  const renderSalaryRangeList = () =>
    salaryRangesList.map(eachItem => (
      <li className="rating-item" key={eachItem.salaryRangeId}>
        <input type="radio" id={eachItem.salaryRangeId} name="salary" />
        <label className="employmentType" htmlFor={eachItem.salaryRangeId}>
          {eachItem.label}
        </label>
      </li>
    ))

  const updateSalrayRange = event => {
    const {updateMinimumPackageValue} = props
    updateMinimumPackageValue(event.target.id)
  }
  const renderSalaryRangeFilter = () => (
    <div className="employmenttype-list-container">
      <h1 className="rating-heading">Type of Employment</h1>
      <ul className="ratings-list" onChange={updateSalrayRange}>
        {renderSalaryRangeList()}
      </ul>
    </div>
  )
  const {renderProfile} = props
  return (
    <div className="filters-group-container">
      {renderProfile()}
      {renderEmploymentFilter()}
      {renderSalaryRangeFilter()}
    </div>
  )
}

export default FiltersGroup

import { FormEvent, useState } from 'react';
import styles from './RegisterCompanyForm.module.scss';
import ApiUtils from 'src/shared/api/apiUtils';
import { CreateCompanyDTO } from 'src/shared/dtos';
import { useNavigate } from 'react-router';
import { UserAuth } from 'src/context';

export const RegisterCompanyForm = () => {
  const navigate = useNavigate();
  const { loadRoles } = UserAuth();

  const [companyName, setCompanyName] = useState('');
  const [foundDate, setFoundDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [localization, setLocalization] = useState('');

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new CreateCompanyDTO();
    data.companyName = companyName;
    data.description = description;
    data.foundDate = foundDate;
    await ApiUtils.companies.addCompany(data).then(async () => {
      // TODO: remove loadRoles when roles will correctly changed in authContext
      loadRoles();
      navigate('/profile');
    });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={(e) => handleFormSubmit(e)}>
        <div className={styles.inputField}>
          <label>Company name</label>
          <input
            type="text"
            placeholder="your company inc."
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputField}>
          <label>Found date</label>
          <input
            type="date"
            placeholder="ex. 12.12.2012"
            value={foundDate.toISOString().split('T')[0]}
            onChange={(e) => setFoundDate(new Date(e.target.value))}
          />
        </div>
        <div className={styles.ownersField}>
          <label>Owners:</label>
          <div className={styles.owners}>
            <div className={styles.oneOwner}>Me</div>
          </div>
        </div>
        <div className={styles.inputField}>
          <label>Description</label>
          <textarea
            className={styles.descriptionTextArea}
            title="description"
            placeholder="type some information about your company..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className={styles.inputField}>
          <label>Localization</label>
          <input
            type="text"
            placeholder="cracow st. długa 12a"
            value={localization}
            onChange={(e) => setLocalization(e.target.value)}
          />
        </div>
        <input type="submit" className={styles.submitButton} />
      </form>
    </div>
  );
};

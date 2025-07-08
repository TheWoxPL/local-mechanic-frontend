import { useState, useRef } from 'react';
import styles from './RegisterCompanyForm.module.scss';
import ApiUtils from 'src/shared/api/apiUtils';
import { CompanyDTO, CreateCompanyDTO } from 'src/shared/dtos';
import { useNavigate } from 'react-router';
import { UserAuth } from 'src/context';
import CloseSVG from '../../assets/svgs/close.svg';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  companyName: z.string().min(2, { message: 'Company name is required' }),
  description: z.string().optional(),
  address: z.string().min(2, { message: 'Address is required' }),
  foundDate: z.date().optional(),
  workingHoursFrom: z.number().min(0).max(24),
  workingHoursTo: z.number().min(0).max(24),
  phoneNumber: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export const RegisterCompanyForm = () => {
  const navigate = useNavigate();
  const { loadRoles } = UserAuth();

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [companyFile, setCompanyFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: '',
      description: '',
      address: '',
      foundDate: new Date(),
      workingHoursFrom: 8,
      workingHoursTo: 16,
      phoneNumber: '',
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCompanyFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setCompanyFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImagePreview(null);
    setCompanyFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError('');

    try {
      const companyData = new CreateCompanyDTO();
      companyData.companyName = data.companyName;
      companyData.description = data.description || '';
      companyData.foundDate = data.foundDate || new Date();
      companyData.workingHours = {
        from: data.workingHoursFrom,
        to: data.workingHoursTo,
      };
      companyData.phoneNumber = data.phoneNumber || '';
      companyData.address = data.address || '';

      const response: CompanyDTO =
        await ApiUtils.companies.addCompany(companyData);

      if (companyFile) {
        const formDataForFile = new FormData();
        formDataForFile.append('file', companyFile);
        formDataForFile.append('companyId', response.id);
        await ApiUtils.companies.uploadCompanyImage(formDataForFile);
      }

      loadRoles();
      navigate('/your-company/' + response.id);
    } catch (error) {
      console.error('Error creating company:', error);
      setError('Failed to create company. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.close}>
          <img
            src={CloseSVG}
            alt="close svg"
            className={styles.closeButton}
            onClick={handleClose}
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.row}>
            <label htmlFor="companyName">Company name</label>
            <input
              type="text"
              id="companyName"
              placeholder="your company inc."
              {...register('companyName')}
              className={errors.companyName ? styles.inputError : ''}
            />
            {errors.companyName && (
              <span className={styles.error}>{errors.companyName.message}</span>
            )}
          </div>

          <div className={styles.row}>
            <label htmlFor="foundDate">Found date</label>
            <input
              type="date"
              id="foundDate"
              defaultValue={new Date().toISOString().split('T')[0]}
              onChange={(e) => setValue('foundDate', new Date(e.target.value))}
            />
          </div>

          <div className={styles.row}>
            <label>Owners</label>
            <div className={styles.owners}>
              <div className={styles.oneOwner}>Me</div>
            </div>
          </div>

          <div className={styles.row}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="type some information about your company..."
              {...register('description')}
              className={errors.description ? styles.inputError : ''}
            ></textarea>
            {errors.description && (
              <span className={styles.error}>{errors.description.message}</span>
            )}
          </div>

          <div className={styles.row}>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              placeholder="cracow st. długa 12a"
              {...register('address')}
              className={errors.address ? styles.inputError : ''}
            />
            {errors.address && (
              <span className={styles.error}>{errors.address.message}</span>
            )}
          </div>

          <div className={styles.row}>
            <label>Working hours</label>
            <div className={styles.workingHoursArea}>
              <input
                min={0}
                max={24}
                type="number"
                placeholder="8"
                {...register('workingHoursFrom', { valueAsNumber: true })}
                className={errors.workingHoursFrom ? styles.inputError : ''}
              />
              <span className={styles.separator}>-</span>
              <input
                min={0}
                max={24}
                type="number"
                placeholder="16"
                {...register('workingHoursTo', { valueAsNumber: true })}
                className={errors.workingHoursTo ? styles.inputError : ''}
              />
            </div>
            {(errors.workingHoursFrom || errors.workingHoursTo) && (
              <span className={styles.error}>
                {errors.workingHoursFrom?.message ||
                  errors.workingHoursTo?.message}
              </span>
            )}
          </div>

          <div className={styles.row}>
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              placeholder="123-456-789"
              {...register('phoneNumber')}
              className={errors.phoneNumber ? styles.inputError : ''}
            />
            {errors.phoneNumber && (
              <span className={styles.error}>{errors.phoneNumber.message}</span>
            )}
          </div>

          <div className={styles.row}>
            <label htmlFor="file">Upload Company Logo</label>
            <div
              className={`${styles.imageUploader} ${isDragging ? styles.dragging : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {imagePreview ? (
                <div className={styles.previewContainer}>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className={styles.imagePreview}
                  />
                  <button
                    type="button"
                    className={styles.removeButton}
                    onClick={handleRemoveImage}
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className={styles.uploadPlaceholder}>
                  <p className={styles.dropText}>
                    <span className={styles.highlight}>Click to upload</span> or
                    drag and drop
                  </p>
                  <p className={styles.allowedFiles}>
                    PNG, JPG or JPEG (max. 5MB)
                  </p>
                </div>
              )}
              <input
                type="file"
                id="file"
                ref={fileInputRef}
                className={styles.fileInput}
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/jpg"
              />
            </div>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registering...' : 'Register Company'}
          </button>
        </form>
      </div>
    </div>
  );
};

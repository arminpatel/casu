import PdfDropzone from '@/components/features/PdfUpload/PdfDropzone';
import styles from './Homepage.module.css';

export default function PdfUploadPage() {
  return (
    <>
      <h2 className={styles.pageTitle}>
        Upload your monthly CAS
      </h2>
      <p className={styles.pageSubtitle}>
      </p>
      <PdfDropzone />
    </>
  );
}

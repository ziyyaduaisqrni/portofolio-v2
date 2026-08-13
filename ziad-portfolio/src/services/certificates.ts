import { getSupabaseClient } from '../lib/supabase';

export type CertificateRecord = {
  id: string;
  title: string;
  issuer: string;
  issue_date: string;
  image: string;
  credential_url: string;
  created_at: string;
  updated_at: string;
};

export async function getCertificates(): Promise<CertificateRecord[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('certificates')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []) as CertificateRecord[];
}

export async function createCertificate(certificate: Omit<CertificateRecord, 'id' | 'created_at' | 'updated_at'>): Promise<CertificateRecord> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('certificates')
    .insert([certificate])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as CertificateRecord;
}

export async function updateCertificate(id: string, certificate: Partial<Omit<CertificateRecord, 'id' | 'created_at' | 'updated_at'>>): Promise<CertificateRecord> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('certificates')
    .update(certificate)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as CertificateRecord;
}

export async function deleteCertificate(id: string): Promise<void> {
  const supabase = getSupabaseClient();
  const { error } = await supabase.from('certificates').delete().eq('id', id);
  if (error) {
    throw error;
  }
}

export async function uploadCertificateImage(file: File): Promise<string> {
  const supabase = getSupabaseClient();
  const bucketName = 'certificates';
  const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
  const { data, error } = await supabase.storage.from(bucketName).upload(fileName, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type,
  });

  if (error) {
    const message = error.message ?? 'Unknown Supabase storage upload error.';
    const bucketError = /bucket/i.test(message) || error.status === 404;
    throw new Error(
      bucketError
        ? `Certificate upload failed: storage bucket "${bucketName}" not found or inaccessible. ${message}`
        : `Certificate upload failed for bucket "${bucketName}". ${message}`
    );
  }

  if (!data || !data.path) {
    throw new Error('Certificate image was uploaded but Supabase did not return a valid storage path.');
  }

  const publicUrlResponse = await supabase.storage.from(bucketName).getPublicUrl(data.path);

  if (!publicUrlResponse || !publicUrlResponse.data || !publicUrlResponse.data.publicUrl) {
    throw new Error('Failed to get a valid public URL for the uploaded certificate image. The storage response was empty or invalid.');
  }

  return publicUrlResponse.data.publicUrl;
}

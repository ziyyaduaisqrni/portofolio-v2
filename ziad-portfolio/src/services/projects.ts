import { getSupabaseClient } from '../lib/supabase';

export type ProjectRecord = {
  id: string;
  title: string;
  slug: string;
  description: string;
  image_url: string;
  tech_stack: string[];
  features: string[];
  live_url: string;
  github_url: string;
  created_at: string;
  updated_at: string;
};

export async function getProjects(): Promise<ProjectRecord[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []) as ProjectRecord[];
}

export async function getProjectBySlug(slug: string): Promise<ProjectRecord | null> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    if ((error as any).code === 'PGRST116') return null;
    throw error;
  }

  return data as ProjectRecord | null;
}

export async function createProject(project: Omit<ProjectRecord, 'id' | 'created_at' | 'updated_at'>): Promise<ProjectRecord> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('projects')
    .insert([project])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as ProjectRecord;
}

export async function updateProject(id: string, project: Partial<Omit<ProjectRecord, 'id' | 'created_at' | 'updated_at'>>): Promise<ProjectRecord> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('projects')
    .update(project)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as ProjectRecord;
}

export async function deleteProject(id: string): Promise<void> {
  const supabase = getSupabaseClient();
  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) {
    throw error;
  }
}

export async function uploadProjectImage(file: File): Promise<string> {
  const supabase = getSupabaseClient();
  const bucketName = 'projects';
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
        ? `Project upload failed: storage bucket "${bucketName}" not found or inaccessible. ${message}`
        : `Project upload failed for bucket "${bucketName}". ${message}`
    );
  }

  if (!data || !data.path) {
    throw new Error('Project image was uploaded but Supabase did not return a valid storage path.');
  }

  const publicUrlResponse = await supabase.storage.from(bucketName).getPublicUrl(data.path);

  if (!publicUrlResponse || !publicUrlResponse.data || !publicUrlResponse.data.publicUrl) {
    throw new Error('Failed to get a valid public URL for the uploaded project image. The storage response was empty or invalid.');
  }

  return publicUrlResponse.data.publicUrl;
}

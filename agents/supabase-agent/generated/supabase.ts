// Shared Supabase type placeholders to keep the skeleton coherent across scripts.
export interface SupabaseProjectConfig {
  projectRef: string;
  defaultSchema?: string;
}

export interface SupabaseMigrationFile {
  name: string;
  path: string;
  checksum?: string;
}

export interface SupabaseSchemaSet {
  coreSchemaPath: string;
  catalogSchemaPath: string;
}

export interface SupabaseDbScript {
  name: string;
  entryPoint: string;
  description?: string;
}

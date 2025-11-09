// src/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gpaeargjmygosmnqaees.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwYWVhcmdqbXlnb3NtbnFhZWVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwOTMwMzYsImV4cCI6MjA3NzY2OTAzNn0.ZLsmzlb-O848dbHSXanIL3_K37b8E81_tjfM7Pe2Zh8';

export const supabase = createClient(supabaseUrl, supabaseKey);

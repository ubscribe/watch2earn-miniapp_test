import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://wjsoubhbfphpuhfphgxn.supabase.co'; // Вставь сюда свой URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indqc291YmhmcGhwdWhmcGhneXhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3NTg1MTQsImV4cCI6MjA2NTMzNDUxNH0.YxXL7wyN7XeBJic32BDlXXkga9nfdJOf772_iYrTBtU'; // Вставь сюда свой anon ключ

export const supabase = createClient(supabaseUrl, supabaseKey);
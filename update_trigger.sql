CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
declare
  new_edge_id text;
begin
  -- Generate unique EDGE-ID (Simple random for now, could loop for uniqueness in prod)
  new_edge_id := 'EDGE-' || floor(random() * (999999 - 100000 + 1) + 100000)::text;
  
  insert into public.profiles (id, email, edge_id, full_name, avatar_url)
  values (
    new.id, 
    new.email, 
    new_edge_id,
    new.raw_user_meta_data->>'full_name', 
    null -- Do NOT auto-fetch avatar from Google/Provider
  );
  return new;
end;
$function$;

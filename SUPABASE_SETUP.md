# Supabase Community Wishlist Setup

This guide explains how to configure Supabase for the Community Wishlist feature in the Floyd Equipment Rental website.

## Prerequisites

- Create a free Supabase account at https://supabase.com.
- Create a new Supabase project.

## Database Table

Create the `equipment_votes` table using the following SQL:

```sql
create table equipment_votes (
  id uuid primary key default gen_random_uuid(),
  equipment_name text not null,
  created_at timestamptz not null default now()
);
```

### What each column is used for

- `id`: A unique identifier for each vote row. It uses `gen_random_uuid()` so Supabase generates the UUID automatically.
- `equipment_name`: The text label for the equipment choice selected by the visitor.
- `created_at`: The timestamp when the vote was inserted.

## Vote Totals View

Create a SQL view to aggregate wishlist votes by equipment name:

```sql
create view community_wishlist_vote_totals as
select
  equipment_name,
  count(*) as vote_count
from
  equipment_votes
group by
  equipment_name
order by
  vote_count desc;
```

This view returns:

- `equipment_name`
- `vote_count`

The view sorts results from highest to lowest vote count.

## Row Level Security

Yes — enable Row Level Security (RLS) for the `equipment_votes` table.

### Recommended policies

First enable RLS:

```sql
alter table equipment_votes enable row level security;
```

Then add policies for anonymous inserts and view access to the vote totals view.

For the `equipment_votes` table:

```sql
create policy "Allow anonymous inserts" on equipment_votes
for insert
with check (true);

create policy "Deny updates" on equipment_votes
for update
using (false);

create policy "Deny deletes" on equipment_votes
for delete
using (false);
```

For the `community_wishlist_vote_totals` view, RLS is inherited from the underlying table. To allow anonymous read access, make sure the table allows select for anon users as well:

```sql
create policy "Allow anonymous select" on equipment_votes
for select
using (true);
```

### Notes

- These policies allow anonymous visitors to insert votes and read totals.
- They prevent update and delete operations.
- Keep the Service Role Key secret and do not expose it in frontend code.

## API Configuration

In the Supabase dashboard, locate these values:

- **Project URL**: Found in the API settings for your project.
- **Publishable (Anon) Key**: Also found in the API settings.

**Important:**

- Do not use the Service Role Key in frontend JavaScript.
- Only use the Publishable (Anon) Key for client-side operations.

## JavaScript Configuration

Place the Supabase Project URL and Publishable Key in `js/supabase.js`.

Update the file like this:

```js
export const SUPABASE_URL = 'https://your-project-ref.supabase.co';
export const SUPABASE_ANON_KEY = 'your-publishable-anon-key';
```

Do not hardcode these values in any other file.

## Testing

Verify the Community Wishlist feature works as expected:

- [ ] Voting works when selecting up to three equipment options.
- [ ] If `Other` is selected, the text box appears and the entered value is submitted.
- [ ] The wishlist form is hidden after a successful submission.
- [ ] The thank-you message appears when the same browser returns.
- [ ] The vote totals chart updates automatically after submitting a vote.
- [ ] If no votes exist yet, the empty state message displays:
  - "No community votes have been submitted yet. Be the first to help shape our future equipment inventory!"
- [ ] If Supabase is unavailable or an error occurs, a friendly error message displays:
  - "Community Wishlist results are temporarily unavailable."

## Future Improvements

Possible future enhancements for the Community Wishlist feature:

- Email signup integration to collect visitor updates.
- Admin dashboard to review wishlist votes and manage equipment ideas.
- Vote analytics for tracking popular equipment over time.
- Duplicate vote prevention across devices or browsers.
- Equipment categories for a more structured wishlist.
- Authenticated admin tools for managing wishlist options and data.

# Floyd Equipment Rental

Website for [Floyd Equipment Rental](https://floydequipmentrental.com), serving homeowners, farmers, and landowners in Floyd County, Virginia.

## Run locally

```bash
python3 -m http.server 43147
```

Then open [http://127.0.0.1:43147](http://127.0.0.1:43147).

## Photos

Original photos live in `assets/`:

- `assets/equipment/commercial-brush-mower/` — the walk-behind brush mower and trailer
- `assets/locations/` — Blue Ridge views around Floyd County
- `assets/community/` — downtown Floyd and community landmarks
- `assets/logo.png` — company mark

The homepage hero uses a Floyd County ridge photo. The brush mower page uses a photo of the actual machine.

The rental business is not open yet. The site says coming soon and collects emails on a mailing list so visitors can hear when you open.

## Mailing list

Signups are stored in Supabase. After you run the SQL in `supabase/mailing_list.sql` once:

1. Open [Supabase](https://supabase.com) and select the Floyd project.
2. Go to **SQL Editor**, paste the file, and click **Run**.
3. Later, go to **Table Editor → mailing_list** to see addresses and export a CSV.

People can also still email floydequipmentrental@gmail.com.

## Tech

Static HTML, CSS, and a little JavaScript. The Community Wishlist and mailing list talk to Supabase. Deploy with the included `.cpanel.yml` to GoDaddy, or copy the files into `public_html`.

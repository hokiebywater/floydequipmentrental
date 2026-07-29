# Changelog

# Version 2.5

**Date:** July 29, 2026

## Added

- Introduced the new **Community Wishlist** feature, allowing visitors to vote on equipment they would like Floyd Equipment Rental to add in the future.
- Added anonymous voting powered by Supabase.
- Created `community-wishlist.js` to manage voting, validation, and live results.
- Created `supabase.js` to centralize Supabase configuration.
- Added `SUPABASE_SETUP.md` documenting the database setup and configuration process.
- Added a thank-you panel displayed immediately after voting and on future visits from the same browser.
- Added a live "Current Community Interest" section displaying community voting results.
- Added an optional email signup section for future customer updates.

## Improved

- Simplified the feature title to **Community Wishlist** for better readability.
- Improved the thank-you experience with clearer messaging after a successful vote.
- Refined spacing and layout throughout the Community Wishlist section.
- Improved the empty-state message shown before any votes have been submitted.
- Ensured the wishlist layout remains responsive on desktop and mobile devices.

## Technical

- Integrated the website with Supabase while keeping the remainder of the website static.
- Implemented browser-based duplicate vote prevention using local storage.
- Configured live vote retrieval from Supabase.
- Added support for displaying community vote percentages.

## Overall

Version 2.5 introduces the website's first dynamic feature while preserving the speed and simplicity of a primarily static website. Visitors can now help shape future equipment purchases through the Community Wishlist, providing valuable community feedback as Floyd Equipment Rental grows.

# Version 2.4

**Date:** July 28, 2026

## Added

- Created a new About page featuring the story behind Floyd Equipment Rental.
- Added a personal company introduction focused on the origins of the business and commitment to serving Floyd County.
- Added a placeholder for a future family photo that will be replaced with an authentic image from the cabin.
- Added a centered introductory statement reinforcing the company's mission.
- Added a personalized closing with founder signature.

## Improved

- Refined the About page layout with a responsive two-column design.
- Improved typography and reading width for better readability.
- Enhanced the photo placeholder styling to better resemble a future photograph.
- Tightened spacing throughout the page for improved visual balance.
- Added reusable CSS classes to support future content pages.

## Documentation

- Continued refining the long-term website architecture and content strategy.
- Established the About page as the company's origin story rather than a traditional corporate biography.

## Overall

Version 2.4 completes the foundational About page and further establishes Floyd Equipment Rental as a local, customer-focused business built around trust, education, and community. The website now includes a strong homepage and a polished About page, providing a solid foundation for future equipment pages and the Learning Center.

## Release 2.3 - Commercial Brush Mower Equipment Page

### Added

- New `commercial-brush-mower.html` equipment detail page.
- Dedicated hero section for the Commercial Walk-Behind Brush Mower.
- Equipment overview section.
- Key specifications panel.
- Ideal projects section.
- "Before You Rent" customer guidance section.
- Features and benefits section.
- Rental requirements section.
- Safety reminders section.
- Frequently Asked Questions section.
- Call-to-action section with reservation and contact buttons.

### Changed

- Added page-specific styles to `style.css`.
- Organized new CSS under the "COMMERCIAL BRUSH MOWER PAGE" section.
- Reused existing site components and styling to maintain design consistency.

### Notes

- Placeholder image and sample specifications are temporary and will be replaced with actual equipment photos and specifications before launch.

## Release 2.2

- Redesigned Featured Equipment section
- Added specification card
- Added benefit cards
- Improved equipment layout

## Release 2.1

- Improved hero
- Added trust strip
- Added footer
- Refined navigation

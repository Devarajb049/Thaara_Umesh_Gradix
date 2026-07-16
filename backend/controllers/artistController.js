import ArtistModel from '../models/artistModel.js';
import ArtistRequestModel from '../models/artistRequestModel.js';

// Helper to generate simple high-entropy token/uuid
const generateToken = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// HTML Email Templates Builder
const buildEmailHTML = (templateName, data) => {
  const brandMaroon = '#9b0b16';
  const brandBg = '#fdf5f5';

  const baseLayout = (title, content) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: ${brandBg}; margin: 0; padding: 0; color: #1a1a1a; }
        .wrapper { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #e5e7eb; }
        .header { background-color: #1a1a1a; padding: 30px; text-align: center; border-bottom: 4px solid ${brandMaroon}; }
        .logo { font-size: 20px; font-weight: bold; letter-spacing: 2px; color: #ffffff; text-decoration: none; font-family: 'Georgia', serif; }
        .content { padding: 40px 30px; line-height: 1.6; font-size: 15px; }
        .footer { background-color: #fcf8f8; padding: 20px; text-align: center; font-size: 11px; color: #6b7280; border-t: 1px solid #e5e7eb; }
        .btn { display: inline-block; padding: 12px 24px; background-color: ${brandMaroon}; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 14px; margin-top: 20px; transition: background-color 0.2s; }
        .highlight { color: ${brandMaroon}; font-weight: bold; }
        .info-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .info-table td { padding: 10px; border-bottom: 1px solid #f3f4f6; }
        .info-table td:first-child { font-weight: bold; color: #4b5563; width: 150px; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <div class="logo">THAARA UMESH CASTING AGENCY</div>
        </div>
        <div class="content">
          <h2 style="color: ${brandMaroon}; margin-top: 0; font-family: 'Georgia', serif;">${title}</h2>
          ${content}
        </div>
        <div class="footer">
          <p>© 2026 Thaara Umesh Casting Agency. All Rights Reserved.</p>
          <p>This is an automated operational notification. Please do not reply directly to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  switch (templateName) {
    case 'registration_received':
      return baseLayout('Application Received Successfully', `
        <p>Dear <span class="highlight">${data.fullName}</span>,</p>
        <p>Thank you for registering as an artist with the Thaara Umesh Casting Agency. Your application has been saved successfully and is currently under review by our admin team.</p>
        <p>Here is a summary of your registered categories:</p>
        <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; border: 1px solid #f3f4f6; margin: 15px 0;">
          <strong>Categories:</strong> ${data.categories}
        </div>
        <p>We will evaluate your details, portfolio, and experience. Once verified, you will receive a follow-up email confirming your status. If approved, your card will become visible in our public directory.</p>
        <p>Best regards,<br><strong>Casting Panel</strong><br>Thaara Umesh Casting Agency</p>
      `);

    case 'artist_approved':
      return baseLayout('Congratulations! Your Profile is Approved', `
        <p>Dear <span class="highlight">${data.fullName}</span>,</p>
        <p>We are thrilled to inform you that your application has been verified and <span class="highlight">APPROVED</span> by our casting directors.</p>
        <p>Your profile card is now live on our public Artists page, enabling agencies and clients to search for your name and discover your profile. Contact details and full portfolio galleries remain securely protected, and clients must request permissions to view them.</p>
        <p>Thank you for choosing Thaara Umesh to manage and represent your talent.</p>
        <p>Best regards,<br><strong>Thaara Umesh</strong><br>Founder, Casting Agency</p>
      `);

    case 'artist_rejected':
      return baseLayout('Update on your Artist Application', `
        <p>Dear <span class="highlight">${data.fullName}</span>,</p>
        <p>Thank you for your interest in registering with the Thaara Umesh Casting Agency. We appreciate the time you took to compile and submit your portfolio.</p>
        <p>After careful review of your profile details against our current roster requirements, we regret to inform you that we are unable to accept your registration at this time.</p>
        <p>This is not a reflection of your potential, as we receive hundreds of profiles and must select based on immediate project mandates. You are welcome to re-apply in the future as you add more work to your portfolio.</p>
        <p>Best regards,<br><strong>Casting Panel</strong><br>Thaara Umesh Casting Agency</p>
      `);

    case 'request_received':
      return baseLayout('Profile Access Request Received', `
        <p>Dear <span class="highlight">${data.requesterName}</span>,</p>
        <p>We have received your request to access the complete casting profile, portfolio gallery, and credentials of the artist <span class="highlight">${data.artistName}</span>.</p>
        <p>Our admin panel is reviewing your viewing request to ensure secure data privacy compliance. Below are the details you submitted:</p>
        <table class="info-table">
          <tr><td>Company:</td><td>${data.companyName}</td></tr>
          <tr><td>Reason:</td><td>${data.reason}</td></tr>
          <tr><td>Requested Date:</td><td>${new Date().toLocaleDateString()}</td></tr>
        </table>
        <p>Upon verification and approval, we will dispatch a secure, unique, and temporary profile link containing access credentials to this email address.</p>
        <p>Thank you for your patience.</p>
        <p>Best regards,<br><strong>Privacy Desk</strong><br>Thaara Umesh Casting Agency</p>
      `);

    case 'request_approved':
      return baseLayout('Profile Access Request Approved', `
        <p>Dear <span class="highlight">${data.requesterName}</span>,</p>
        <p>Your request to view the full casting profile of <span class="highlight">${data.artistName}</span> has been <span class="highlight">APPROVED</span> by our admin desk.</p>
        <p>You can view their full bio, contact information, high-resolution portfolio images, resume (PDF), and introduction videos via the secure, private token link below:</p>
        <div style="text-align: center; margin: 25px 0;">
          <a href="${data.accessLink}" class="btn" target="_blank">View Secure Profile Page</a>
        </div>
        <p>Or copy this URL to your browser:</p>
        <p style="word-break: break-all; font-size: 13px; color: ${brandMaroon}; font-weight: bold; background: #fdf5f5; padding: 10px; border-radius: 8px;">${data.accessLink}</p>
        <p><strong>Access Instructions:</strong><br>
        1. This link is secure and unique to your request.<br>
        2. Do not share this URL with unauthorized personnel.<br>
        3. This profile page is hidden from search engine indexing for privacy security.</p>
        <p>Best regards,<br><strong>Admin Panel</strong><br>Thaara Umesh Casting Agency</p>
      `);

    case 'request_rejected':
      return baseLayout('Update on your Profile Access Request', `
        <p>Dear <span class="highlight">${data.requesterName}</span>,</p>
        <p>Thank you for submitting a request to access the casting profile of <span class="highlight">${data.artistName}</span>.</p>
        <p>Following review of the application, we regret to inform you that we are unable to approve your viewing permissions at this time. Access to detailed contact information and private portfolios is restricted to authenticated client agencies and matching projects.</p>
        <p>If you believe this was an error, please reach out to us directly through our Contact Us page.</p>
        <p>Best regards,<br><strong>Admin Panel</strong><br>Thaara Umesh Casting Agency</p>
      `);

    default:
      return '';
  }
};

// --- Artist Endpoints ---

export const getArtists = async (req, res, next) => {
  try {
    const { search = '', status = '', category = '', limit = 100, page = 1 } = req.query;
    const limitVal = parseInt(limit);
    const pageVal = parseInt(page);
    const offsetVal = (pageVal - 1) * limitVal;

    const artists = await ArtistModel.getAll({
      search,
      status,
      category,
      limit: limitVal,
      offset: offsetVal
    });

    const total = await ArtistModel.getCount({ search, status, category });

    res.json({
      success: true,
      data: artists,
      pagination: {
        total,
        page: pageVal,
        limit: limitVal,
        totalPages: Math.ceil(total / limitVal)
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getArtistById = async (req, res, next) => {
  try {
    const artist = await ArtistModel.getById(req.params.id);
    if (!artist) {
      return res.status(404).json({ success: false, message: 'Artist profile not found' });
    }
    res.json({ success: true, data: artist });
  } catch (error) {
    next(error);
  }
};

export const registerArtist = async (req, res, next) => {
  try {
    const artistData = req.body;
    if (!artistData.fullName || !artistData.email || !artistData.phone) {
      return res.status(400).json({ success: false, message: 'Full Name, Email, and Phone Number are required fields.' });
    }

    const artist = await ArtistModel.create(artistData);

    // Simulate sending email: generate HTML and log/return
    const emailHTML = buildEmailHTML('registration_received', artist);

    res.status(201).json({
      success: true,
      data: artist,
      simulatedEmail: {
        to: artist.email,
        subject: 'Artist Application Received - Thaara Umesh Casting Agency',
        body: emailHTML
      }
    });
  } catch (error) {
    next(error);
  }
};

export const updateArtistStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'approved' or 'rejected'

    if (!['approved', 'rejected', 'pending'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status code' });
    }

    const artist = await ArtistModel.getById(id);
    if (!artist) {
      return res.status(404).json({ success: false, message: 'Artist not found' });
    }

    await ArtistModel.updateStatus(id, status);

    // Build email template
    const templateName = status === 'approved' ? 'artist_approved' : 'artist_rejected';
    const emailHTML = buildEmailHTML(templateName, artist);

    res.json({
      success: true,
      data: { id, status },
      simulatedEmail: {
        to: artist.email,
        subject: status === 'approved' 
          ? 'Congratulations! Your Artist Profile is Approved - Thaara Umesh'
          : 'Update on your Artist Application - Thaara Umesh',
        body: emailHTML
      }
    });
  } catch (error) {
    next(error);
  }
};

export const deleteArtist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const success = await ArtistModel.delete(id);
    if (!success) {
      return res.status(404).json({ success: false, message: 'Artist not found' });
    }
    res.json({ success: true, message: 'Artist profile deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// --- Request Endpoints ---

export const getRequests = async (req, res, next) => {
  try {
    const { search = '', status = '', limit = 100, page = 1 } = req.query;
    const limitVal = parseInt(limit);
    const pageVal = parseInt(page);
    const offsetVal = (pageVal - 1) * limitVal;

    const requests = await ArtistRequestModel.getAll({
      search,
      status,
      limit: limitVal,
      offset: offsetVal
    });

    const total = await ArtistRequestModel.getCount({ search, status });

    res.json({
      success: true,
      data: requests,
      pagination: {
        total,
        page: pageVal,
        limit: limitVal,
        totalPages: Math.ceil(total / limitVal)
      }
    });
  } catch (error) {
    next(error);
  }
};

export const createProfileRequest = async (req, res, next) => {
  try {
    const requestData = req.body;
    if (!requestData.requesterName || !requestData.requesterEmail || !requestData.artistId) {
      return res.status(400).json({ success: false, message: 'Requester Name, Email, and Artist ID are required.' });
    }

    const artist = await ArtistModel.getById(requestData.artistId);
    if (!artist) {
      return res.status(404).json({ success: false, message: 'Requested artist profile does not exist.' });
    }

    const request = await ArtistRequestModel.create(requestData);

    const emailHTML = buildEmailHTML('request_received', {
      requesterName: request.requesterName,
      artistName: artist.fullName,
      companyName: request.companyName || 'Not Provided',
      reason: request.reason || 'Not Provided'
    });

    res.status(201).json({
      success: true,
      data: request,
      simulatedEmail: {
        to: request.requesterEmail,
        subject: 'Profile Access Request Received - Thaara Umesh',
        body: emailHTML
      }
    });
  } catch (error) {
    next(error);
  }
};

export const updateRequestStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'approved' or 'rejected'

    if (!['approved', 'rejected', 'pending'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status code' });
    }

    const request = await ArtistRequestModel.getById(id);
    if (!request) {
      return res.status(404).json({ success: false, message: 'Access request not found' });
    }

    let token = null;
    if (status === 'approved') {
      token = generateToken();
    }

    await ArtistRequestModel.updateStatus(id, status, token);

    // Secure link
    const host = req.get('host') || 'localhost:3000';
    const protocol = req.protocol || 'http';
    const accessLink = `${protocol}://${host}/artist-access/${token}`;

    const templateName = status === 'approved' ? 'request_approved' : 'request_rejected';
    const emailHTML = buildEmailHTML(templateName, {
      requesterName: request.requesterName,
      artistName: request.artistName,
      accessLink
    });

    res.json({
      success: true,
      data: { id, status, accessToken: token },
      simulatedEmail: {
        to: request.requesterEmail,
        subject: status === 'approved'
          ? `Access Granted: View ${request.artistName}'s Profile - Thaara Umesh`
          : `Update on your Profile Access Request - Thaara Umesh`,
        body: emailHTML
      }
    });
  } catch (error) {
    next(error);
  }
};

export const deleteRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const success = await ArtistRequestModel.delete(id);
    if (!success) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }
    res.json({ success: true, message: 'Request deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const verifyToken = async (req, res, next) => {
  try {
    const { token } = req.params;
    const request = await ArtistRequestModel.getByToken(token);
    
    if (!request) {
      return res.status(404).json({ success: false, message: 'Invalid or expired secure profile access token.' });
    }

    const artist = await ArtistModel.getById(request.artistId);
    if (!artist) {
      return res.status(404).json({ success: false, message: 'Artist profile no longer exists.' });
    }

    res.json({ success: true, data: artist });
  } catch (error) {
    next(error);
  }
};

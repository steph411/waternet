import React from 'react';
import { FooterBottomBar } from '../components/Footer';
import { Header } from '../components/Header';
import { TopSection } from '../components/TopSection';
import { TermsTitle, TermsText } from './terms';





export const TermSubtitle: React.FC = ({ children }) => {
  return (
    <h4 className="pt-6 pb-2 text-sm font-bold text-light-blue-800" >
      {children}
    </h4>
  )
}

const CookiesPolicyPage: React.FC = () => {
  return (
    <section className="bg-cold-gray-50">
      <TopSection noImage={true} searchBar={false}>

        <h2 className="w-3/4 pt-40 pb-32 mx-auto text-3xl font-bold text-white">
          Ewatergate Privacy policy
        </h2>
      </TopSection>
      <div className="px-40 pb-12 -mt-56">
        <TermsTitle>
          introduction 
        </TermsTitle> 
        <TermsText>
          eWaterGate may use cookies, web beacons, tracking pixels, and other tracking technologies when you visit our website [www.ewatergate.com], including any other media form, media channel, mobile website, or mobile application related or connected thereto (collectively, the “Site”) to help customize the Site and improve your experience. <br/>

          We reserve the right to make changes to this Cookie Policy at any time and for any reason. We will alert you about any changes by updating the “Last Updated” date of this Cookie Policy. Any changes or modifications will be effective immediately upon posting the updated Cookie Policy on the Site, and you waive the right to receive specific notice of each such change or modification. <br/>

          You are encouraged to periodically review this Cookie Policy to stay informed of updates. You will be deemed to have been made aware of, will be subject to, and will be deemed to have accepted the changes in any revised Cookie Policy by your continued use of the Site after the date such revised Cookie Policy is posted. 

        </TermsText>
        <TermsTitle>
          use of cookies
        </TermsTitle>
        <TermsText>
        A “cookie” is a string of information which assigns you a unique identifier that we store on your computer. Your browser then provides that unique identifier to use each time you submit a query to the Site. We use cookies on the Site to, among other things, keep track of services you have used, record registration information, record your user preferences, keep you logged into the Site, facilitate purchase procedures, and track the pages you visit. Cookies help us understand how the Site is being used and improve your user experience. 

        </TermsText>
        <TermsTitle>
          types of cookies
        </TermsTitle>
        <TermsText>
          The following types of cookies may be used when you visit the Site:
          <TermSubtitle>
            Advertising Cookies
          </TermSubtitle>
          <TermsText>
          Advertising cookies are placed on your computer by advertisers and ad servers in order to display advertisements that are most likely to be of interest to you. These cookies allow advertisers and ad servers to gather information about your visits to the Site and other websites, alternate the ads sent to a specific computer, and track how often an ad has been viewed and by whom. These cookies are linked to a computer and do not gather any personal information about you. 

          </TermsText>
          <TermSubtitle>
            analytic cookies
          </TermSubtitle>
          <TermsText>
            Analytics cookies monitor how users reached the Site, and how they interact with and move around once on the Site. These cookies let us know what features on the Site are working the best and what features on the Site can be improved. 

          </TermsText>
          <TermSubtitle>
            our cookies
          </TermSubtitle>
          <TermsText>
          Our cookies are “first-party cookies”, and can be either permanent or temporary. These are necessary cookies, without which the Site won't work properly or be able to provide certain features and functionalities. Some of these may be manually disabled in your browser, but may affect the functionality of the Site.

          </TermsText>
          <TermSubtitle>
            personnalization cookies
          </TermSubtitle>
          <TermsText>
          Personalization cookies are used to recognize repeat visitors to the Site. We use these cookies to record your browsing history, the pages you have visited, and your settings and preferences each time you visit the Site. 
          </TermsText>
          <TermSubtitle>
            security cookies
          </TermSubtitle>
          <TermsText>
          Security cookies help identify and prevent security risks. We use these cookies to authenticate users and protect user data from unauthorized parties.

          </TermsText>
          <TermSubtitle>
            site management cookies
          </TermSubtitle>
          <TermsText>
          Site management cookies are used to maintain your identity or session on the Site so that you are not logged off unexpectedly, and any information you enter is retained from page to page. These cookies cannot be turned off individually, but you can disable all cookies in your browser.

          </TermsText>
          <TermSubtitle>
            authentication cookies
          </TermSubtitle>
          <TermsText>
          We use cookies to recognize you when you visit our Services. If you’re signed into eWaterGate, cookies help us show you the right information and personalize your experience in line with your settings.
    
          </TermsText>
          <TermSubtitle>
            third-party cookies
          </TermSubtitle>
          <TermsText>
          Third-party cookies may be place on your computer when you visit the Site by companies that run certain services we offer. These cookies allow the third parties to gather and track certain information about you. These cookies can be manually disabled in your browser. 

          </TermsText>
          
        </TermsText>
        <TermsTitle>control of cookies</TermsTitle>
        <TermsText>
          Most browsers are set to accept cookies by default. However, you can remove or reject cookies in your browser’s settings. Please be aware that such action could affect the availability and functionality of the Site.<br/> 

          For more information on how to control cookies, check your browser or device’s settings for how you can control or reject cookies, or visit the following links:

          <ul className="list-disc list-inside">
            <li>
              Apple Safari
            </li>
            <li>

          Google Chrome
            </li>
            <li>
          Microsoft Edge

            </li>
            <li>

          Microsoft Internet Explorer
            </li>
            <li>

          Mozilla Firefox
            </li>
            <li>
          Opera

            </li>
            <li>
          Android (Chrome) 

            </li>
            <li>
          Blackberry

            </li>
            <li>
          Iphone or Ipad (Chrome)

            </li>
            <li>
          Iphone or Ipad (Safari)

            </li>
            <li>

          In addition, you may opt-out of some third-party cookies through the Network Advertising Initiative’s Opt-Out Tool.
            </li>
          </ul>

        </TermsText>
        <TermsTitle>
          other tracking technologies
        </TermsTitle>
        <TermsText>
          In addition to cookies, we may use web beacons, pixel tags, and other tracking technologies on the Site to help customize the Site and improve your experience. A “web beacon” or “pixel tag” is tiny object or image embedded in a web page or email. They are used to track the number of users who have visited particular pages and viewed emails, and acquire other statistical data. They collect only a limited set of data, such as a cookie number, time and date of page or email view, and a description of the page or email on which they reside. Web beacons and pixel tags cannot be declined. However, you can limit their use by controlling the cookies that interact with them.

        </TermsText>
        <TermsTitle>
          privacy policy
        </TermsTitle>
        <TermsText>
          For more information about how we use information collected by cookies and other tracking technologies, please refer to our Privacy Policy posted on the Site. This Cookie Policy is part of and is incorporated into our Privacy Policy. By using the Site, you agree to be bound by this Cookie Policy and our Privacy Policy.

        </TermsText>
        <TermsTitle>contact us</TermsTitle>
        <TermsText>
        If you have questions or comments about this Cookie Policy, please contact us at:<br/>

          <a href="mailto:ewatergate@gmail.com">ewatergate@gmail.com</a>
        </TermsText>
      </div>
      <FooterBottomBar/>
    </section>
  )
}


export default CookiesPolicyPage
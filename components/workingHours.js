import NextLink from "next/link";
export default function WorkingHours({ siteData, fonts }) {
  return (
    <div className="mb-10">
      <div
        className={`${fonts.marker.className} text-6xl md:text-6xl font-bold text-center mb-12`}
      >
        <p className="mt-24 ">Working Hours</p>
        <div className="flex justify-center">
          {siteData.online == true && (
            <img
              src={
                siteData.opening_hours.open_now
                  ? `workHours/open.png`
                  : `workHours/closed.png`
              }
              style={{ width: "50px", height: "50px" }}
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 text-center">
        <div>
          <p className={`${fonts.marker.className} mx-2 font`}>Hours</p>
          <ul>
            {siteData.opening_hours.weekday_text.map((hours, i) => (
              <li key={i}>{hours}</li>
            ))}
          </ul>
        </div>
        <div>
          <div>
            <p className={`${fonts.marker.className} mx-2 mt-10`}>Phone</p>
            <ul>
              {siteData.phone.map((phone, i) => (
                <NextLink key={i} href={`tel:${phone}`}>
                  <div>{phone}</div>
                </NextLink>
              ))}
            </ul>
          </div>
          <div>
            <p className={`${fonts.marker.className} mx-2 mt-10`}>Email</p>
            <ul>
              {siteData.email.map((email, i) => (
                <NextLink key={i} href={`mailto:${email}`}>
                  <div>{email}</div>
                </NextLink>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <NextLink href={siteData.googleMap}>
            <p className={`${fonts.marker.className} mx-2 mt-10`}>Address</p>
            {siteData.address.map((address, i) => (
              <p key={i}>{address.long_name}</p>
            ))}
          </NextLink>
        </div>
      </div>
    </div>
  );
}

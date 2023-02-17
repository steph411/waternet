import React from 'react'


interface Props {
  className?: string;
}


const WaterDigital: React.FC<Props> = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      // xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="-.5 -.5 52 52">
      <defs/>
      <image width="51" height="51" x="-.5" y="-.5" preserveAspectRatio="none" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAADVklEQVR4Ae2cTW4WMQyGeyUuwAW4ABfgApyDPRfgAlyAJQsQCyQW3SEhgcQCCSGk/nxtg1yoKqp4anc8dmbmifSprTuJk/eJnfnJfEeNUqrAUal3nDcAFE8CAACgWIFi90QAAIoVKHZPBACgWIFi90QAAIoVKHY/ZAT8Oly1V98O7dmns/b041l79PYk5PPkw2l7fnzeXn45L5b91v1wAN7/vGwiVJToWjuP3520Nz8ubpUo+m0oACK+CKOJtoS9GsIwACTtRKYbKywBXlmGASA53ypa9HGVa8IwAGRxjBbW2p74rirDANAW3sgcLWtMD0plGhoGQE8YsUWXLD/WfgPg3zWGVbDo4wAAgL9zKis1ZPmxRgoRQAQQAdZouT7u+Pfl9T0UuXiJ/GipIdKHtJXl5/X3i/b19OpebV0p6MXnQ/q9Gk2wtdhFs6liBiBE1zLo0fo5dTFpBlB5q2A0Qb39mbrSNgPIvk3sHeTox2tpyAxg9AGO3j8ABD3WfChoAAAg91HjQ2fqUvWIACKACOhFAWdBSZHRE19sAADAPlITEZA007WzKAAAYB+phggonumbB+B9QqYJkm3fzBqgDUSzZwut+dP6Z74O8M68pY7XBqLZl+qHt12tf2YAWgPY5ykAgHn6za4NgNkSzmvADMCb85Y63jvcpfrhbVfrtxmAtrpn27WBaPbs/mn+tP4BIOnCbTMAZGuktcix2ozMtmt9Xl0EeN7nkm2B2UJr/jYDQAYob1TeVyrfuuxB0Pq7ugi4GZy8Uywz/O7ZiNgq3je+6Zf2c3MAtIGOagdA0tmONgEAAACeiPWiYLWLsBbqo9p74osNAEmpCQBJQmsRCAAAsAj3ooA1ICkyeuKLDQAA2EdqIgKSZjpnQcVCAwAA+8jp2kzX7KwBxZEBAADsOzURAUQAEdCLAm5FJEVGT3yxmQGMuNVDO+UbzS7aacUMQL73bLSBraU/UxvJzACE4Ehb/dYivmg2VVwApCHZ8CpE7+5I4+//v0dVNLJsJHYDmKLJ//wKAMCvWWgNAITK6W8MAH7NQmsAIFROf2MA8GsWWgMAoXL6GwOAX7PQGgAIldPfGAD8moXWAEConP7GAODXLLQGAELl9DcGAL9moTUAECqnv7E/9xSb0Pz9fGMAAAAASUVORK5CYII="/>
    </svg>
  )
}


export default WaterDigital
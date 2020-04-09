/** @jsx jsx */
import { jsx } from "theme-ui"
import { MdTranslate } from "react-icons/md"
import { Link } from "gatsby"
import LocalizedLink from "./localized-link"
import { mediaQueries } from "gatsby-design-tokens/dist/theme-gatsbyjs-org"
import { useLocale } from "./I18nContext"

import { langs, getLocaleAndBasePath, localizedPath } from "../utils/i18n"

const navItemTopOffset = `0.4rem`
const navItemStyles = {
  borderBottom: `2px solid transparent`,
  color: `navigation.linkDefault`,
  display: `block`,
  fontSize: 3,
  lineHeight: t => t.sizes.headerHeight,
  [mediaQueries.md]: {
    lineHeight: t => `calc(${t.sizes.headerHeight} - ${navItemTopOffset})`,
  },
  position: `relative`,
  textDecoration: `none`,
  zIndex: 1,
  "&:hover, &:focus": { color: `navigation.linkHover` },
}

const allLangs = [
  { code: "en", name: "English", localName: "English" },
  ...langs,
]

const menuLinkStyles = {
  color: "black",
  width: `100%`,
  px: 6,
  py: 3,
  ":hover": {
    bg: `sidebar.itemHoverBackground`,
    color: `navigation.linkHover`,
  },
}

function LangLink({ code, name, localName, current, pathname }) {
  const { basePath } = getLocaleAndBasePath(pathname)
  return (
    <Link to={localizedPath(code, basePath)} sx={menuLinkStyles}>
      <span
        sx={{
          fontWeight: current && `semiBold`,
          color: current && `navigation.linkHover`,
        }}
      >
        {localName}
      </span>
      <span sx={{ ml: 2, color: `textMuted`, fontSize: 2 }}>{name}</span>
    </Link>
  )
}

export default function LanguageDropdown({ pathname }) {
  const locale = useLocale()
  return (
    <div sx={{ position: `relative` }}>
      <button
        sx={{
          border: 0,
          background: `none`,
          cursor: `pointer`,
          outline: `none`, // FIXME enable when tabbing
          ...navItemStyles,
        }}
      >
        <MdTranslate /> Languages
      </button>
      <ul
        sx={{
          position: `absolute`,
          right: 0,
          margin: 0,
          fontSize: 3,
          width: `16rem`,
          bg: `background`,
          borderWidth: `1px`,
          borderColor: `ui.border`,
          boxShadow: `dialog`,
        }}
      >
        {allLangs.map(lang => (
          <li sx={{ listStyleType: `none`, display: `flex`, margin: 0 }}>
            <LangLink
              {...lang}
              key={lang.code}
              current={locale === lang.code}
              pathname={pathname}
            />
          </li>
        ))}
        <li sx={{ listStyleType: `none`, display: `flex`, margin: 0 }}>
          <LocalizedLink
            to="/languages"
            key="allLangs"
            sx={{
              ...menuLinkStyles,
              borderTop: `1px solid`,
              borderColor: `ui.border`,
            }}
          >
            More languages
          </LocalizedLink>
        </li>
      </ul>
    </div>
  )
}

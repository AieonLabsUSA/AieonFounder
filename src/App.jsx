import { useState, useEffect, useRef } from "react";

// ================================================================
// AieonFounder - Public Flow Wrapper
// Landing -> Main App -> Pricing -> Contact
// founder.aieonlabs.com
// ================================================================

// ----------------------------------------------------------------
// NAVIGATION SHELL
// ----------------------------------------------------------------
const NAV_PAGES = ["landing","app","pricing","contact"];

function useRouter() {
  const [page, setPage] = useState("landing");
  const [history, setHistory] = useState(["landing"]);
  
  function navigate(to) {
    setPage(to);
    setHistory(function(h) { return [...h, to]; });
  }
  
  function goBack() {
    setHistory(function(h) {
      if (h.length <= 1) return h;
      var newH = h.slice(0, -1);
      setPage(newH[newH.length - 1]);
      return newH;
    });
  }
  
  return { page, navigate, goBack };
}

function NavBar({ page, navigate, goBack }) {
  var links = [
    { id:"landing", label:"Home" },
    { id:"app",     label:"Get Started" },
    { id:"pricing", label:"Pricing" },
    { id:"contact", label:"Contact" },
  ];
  return(
    <div style={{position:"fixed",top:0,left:0,right:0,zIndex:9999,background:"rgba(8,15,43,0.95)",backdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255,255,255,0.06)",padding:"0 24px",display:"flex",alignItems:"center",height:52,gap:24}}>
      <div style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",flexShrink:0}} onClick={function(){navigate("landing");}}>
        <div style={{fontSize:13,fontWeight:900,color:"#fff",letterSpacing:"-0.3px"}}>AieonFounder</div>
        <div style={{fontSize:9,background:"#1a56db",color:"#fff",borderRadius:4,padding:"1px 6px",fontWeight:700,letterSpacing:1}}>BETA</div>
      </div>
      <div style={{flex:1}}/>
      <div style={{display:"flex",gap:4}}>
        {links.map(function(link) {
          var isActive = page === link.id;
          return(
            <button key={link.id} onClick={function(){navigate(link.id);}} style={{padding:"6px 14px",borderRadius:8,border:"none", background:isActive?"rgba(26,86,219,0.2)":"transparent", color:isActive?"#fff":"rgba(255,255,255,0.5)", fontSize:12,fontWeight:isActive?700:400,cursor:"pointer", fontFamily:"inherit",transition:"all 0.15s"}}>{link.label}</button>






          );
        })}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------
// LANDING PAGE
// ----------------------------------------------------------------
const CN = {
  navy:"#0d1f4e", navyDark:"#080f2b", navyMid:"#152663",
  blue:"#1a56db", blueBright:"#3b82f6", teal:"#00d4c8",
  white:"#ffffff", offWhite:"#f8faff",
  text:"#0f172a", muted:"#64748b", border:"#e2e8f0",
  success:"#059669",
};

var _L1="data:image/webp;base64,UklGRt5LAABXRUJQVlA4WAoAAAAQAAAAFwEAFwEAQUxQSDwgAAABDAdtI0lSzB/29M5zOgARMQH9Z+ur3zQ+QBW8KOqF5dM7bqFd77j0i9jCjXqH9nGPewhZo8qNXcQJGm1Ubq2NHGzqOiZtY69R9xGlU+y06hOOjikaTVjcYELb5j5doIpmhpoUFZ0zRTctlYIOjY3m7goqdBH6WX/Y/6m20/7f8/WambUPUSAJmuAW3N3dIUBxd6kb1lLcoe5F6gYVtBDcU8EJ7m6REttr5PkHydlr1l575/3RKyImwLNt26Ztbds2L9u+rpBiVvi6TsCO2w5de5/DZdsKGSHdtm3bWNcarbdWS2Dd9xq1jXUCETEB+P9attbauYn9tPkfAFFjraBza1RlPk5gMdc99tjjoFdfe+21l1+7ZY+99th9j03xaWdkfkzVAsDwlb4w8dYH2fntv1xx5SEAYM38lgLAwJCzHuWnvfc+zt1/mp/+15WfGQBgZL7KYsnxe9w05UMyxRACO04hpERyyo1HbQY4mS9SBaTA2DM/IkkfmTGWJDn7/mUxvywKbPUeqZRolirgu78Y21Kd31Fsugaw0hltBrFQBbLcB2Lnc0TGDlvwhilk4oJTmd69YSGIzNcAGD+ZLFn/Z79j4OZjTGvURDIk1j4FcuJwyHzLEBw+jSmyK2PJRw8rjMyfKDZ8k55dG8itMF8qMuSaGYzs4jD7k30XLGT+o8CXyciuTuQjUJnfaOFozkrs8phe3bEFnb9Q/OCVENmEuxSQ+QmDLTwTGzC1+fBYq/MP0hoyMbXZjJ6rws4/OOxLz4aM4c7FIfMLDofNKVNTsOTPXGs+QXEWU2JzluVasPMFguV9SGzQxCeWhs4PuCF/jiUbNfK91VT7PyPrx5IN2+YOavo/xakMTZPSZPT/IuPKlJqGPn1dbb9X4OexzcYt+Wc46e/UjH4ghjpok8tgaF/itL8z9uv0zF+DTUYtIjHA9nfAWqkreE++9fY8SYY6kGsnwfRziv3+0xU9yUe+amSuRvY9exLbIeYrXj6z1ccZ2YUpWgN553W/KDDogZtJxmwET7a2f7O6bZpofmBrALCDMAV068OeYf5Kd0P6N8V1zI5UzvrVUKi1gkELAHylHdVE5Ekw/ZrK7ox0Rk5ZGwU6F2NauByqyadbUPRrBW6MZUMi799h2Y2lAgBiF33tD1RPKj/eBLY/M7rxaz61TACwA6o/+msjWxj5wAJG+jKrB7NkY+RIYwR2cViKuRMH0JeJ6pspVRfCE0sPAWBsgHNHzGmnLLG8";
var _L2="dRkjfZjFuQysPnJbCDILdmTMwjb3R9F/GbPheyFWF3g9HLIXegPLlhhvHqbSdxU4lG1WHsNHa6nJZ3T9qVQHyWHov2zrrOSrC/4KWNRQsfpLUkcMP4HttwSOOROHqNQBLRxY0RE4aYG+y8gRIVUXeefQmjg9lvUOluEouP7K4RyGL6UpVy4gqKWYYd+lzyH+sphIPyU6+vsq7N5/Hxb1vYI+AzBU+ysZQWNKHGKkNsYt9WSIGUpfhOmnFPuWfIF3trQ+KHADyxz17nij/ZPYxV9W2pL/eD1Y1Fd1LZ9SdUz8shb9U4HjOGH38TdwqLFA32eOSF+D65/MgtenbOBfpFawegDLDER/smi/JBjFhD2mB8eK1ErskInJZwicDNsvKX4Uos9zS1jU2+G7edJ/DKRPMvYZhga/u9QNYj9OycfIe8ao9EVOj5lT0h7h74VD3S0OpW9g4jhoPyRmxJtMlUlcHlI7scNuS6Mhhj/A9EMGlzGy8uRcKOrv8L0YHXxpoB9S3Wi6T9UFG4npAsgC0yUfS/9VuP6nwHlss/Lg7eEO3WhwOKMhpY/GifY7oqNuj7Ey1d+Ph3aHrP+fIR8jt0L/s9ORn1dDegOC7nTyY5Y59IMd+x5dfYHC7rmnmi4BRrydUnXEuB2uvxE59FfpS3726tI9mMkcg6eG2f7G6T0E7hT9hlB0q8o3Z4cMJCtA+xnFOlNiD/wRFN3rcDXLHDrdmb7GrEDLymq6yOop0Wco3kdfK/gVZUvhk3WlmyD4d4zViSnXLwHtW1R2LEu2Ml4Ch242ujF9dRsv6F+MrMso3DG8P0Klq1SXfyXFDNF/G9K3YEN67IGHQtHdDie1ywyJ76FvNbJVCraMNw2x0mUweI6x442W9CuC55lsE89CgW5XeT1mYJkuhutPHL4US9pH+zix3YcJ9A0pTFlLTD+iOv71GCsr7oWi68UO3MLho+cE9CVGt2XJDOO1AWCwyfspX0rvQPoR4MmUKgvusg5NaPAs5WMZL4TrP6x8LXlW7mccA9sIqrdn8fzbCCt9R4Gr2a4spOdh0AxYtp2DnpuK7Te0GH1PDJVFXtEUcOZilhkCL4D2G4InGVl1Sq8NFWkI0TFPp1hdSlxVpL8w8jmWrLwMJ4tDUxq8EEN1bMffougvCvyJ7Qz8GhpEvsUcIfxncdV+QuwSd8RQWUw/H6nSGKIDzzNWR8/zneknHLZjmxmHQ9CcTg5olxlSipB+wrR+X+lL5VLSJLC4lyFDzj4Upo8AiGwlz1CHJhVZOTBjpueWsdIviBnz83bhjunx";
var _L3="UUaaBUswZaDNA9X2Cw67scQe4t9g0ax2yB/pM5TpcPQN2roqBB85VqRhDNZ6LSQf4+yD1PQHghYzVrx/uDYNHB5maCh5B4r+QLHszJSBLy3YPKq7pNiQ/Dtbi+0LnN5KX1lp8nkj0DiCIcxa8lh1/YCVA+aUrFwsgSY2xe5vpnxMHw2I9AEF9ma7MvHjoYU0ECzuJTq4DrT3iS5yV4qVBRfBoonV7JNq8Omhlu19Vm6lZ3XrlzWUwFUHS3+ouJ7ncEusruq3JxltJFh3J9GQ+N4IkR5nsfEHPlVGnH+ISDOJOeRzlT4mro4eJ3bERAZWrj+cdIpoM6FYva9oCOl+sT0Ow5lYeXD5oYdDGsrusI1soG8fK7aXiVnkxVG25P+7DRpcMDmlDBNHoehlBY5lwu7jVXANZnVftjMUDyxppIeZkX/MtCXOGSlocDXrvBVjdSTvgeldoguz0cfjYJoMFqe3Q4byzy1jpGcZXB7L1+ZucI0GQUqpOtr8PIpepbr51AzBv7iy0ZqoNXaQxhoVqYe6X9NniOkfo1V6VIGvso3d83hY1NOgSqmFkRXeDdHHxCVVe5PKuBdjsmU6GRZ1FAusc+/d9w7y7nuvGT8wGk5qAIdvhbIhxmthetWiTLQHt1ZTB4PV7mf/i9kPnt8CTA0g+CDJl8LMXdT0JIPjU6ys9MqqqnXA0Ot+CCNnJs5+/sShEMkHO5sNbPNsKXqRmGXezzDWPguL7DowcPnLgJgdSL58OUSzqU74sORL4Z1Roj2owKlss2rp3xBkV2B7MoQ1leR1DiYXHC6o8DHyavQg0VG3x1hZ8ohqNoslvvlhCNhjyQeXhAzLBKO/RQ3pDTG9R/VhRlZd9euj8inGv8rMgR9dO+ogY/IA/+pgOeezcD3H4NlYXazfsXLIrNh1GuekPIzkQ0MgeRTXkw0pvbmSSI8x2ObjkKoSf1vtiNxmYAYDs6eSL421JovBqTEaGLiiaG8Re+gHJO6YrpZsDvfmxBInroTNAldcyzKHbkOPURzHwB44HqZJ3ZF/Ly2C5PLQLIIlPkqpOulfy6n0FBn2XJYtxdkbSC5BiVhmtd9fyZocEDzBDEy6BEUvcbiUwF6W54lDr8HuM3IpeP4KmsXIJslnyLpnhNGeclH6UmhvD80jdvijTBYbuIVqDrji1yyrI/l5mB7Sav2CYYs8aXXNI+L+w4A1PWW8EUUWxXJvxlSd4seivcNgUyZ2Xy4LRR6MiDHNy0zISkMMz21gNAcE76SYIb0GSK9Q2fj1KFvJ7xUt5HX6m+A5NxPgs0DN";
var _L4="Y+LM4SItehVDdYRwwxJGeoTBTjMC7krPjxLJVODP7IycdPh6a9iN7p7EKlM5FFlUFn03Jh89NzCmRzj301Q2vD9SMxkZ/7pPHQT+fT/M8/TZoTO2l8wDJ1/2ZUOMv4P0BiObRE+7yp/vKCaPFr9n4OATXwKMMSrGDOCq0O7I8++wLVD7AsvHyJ2gPUHwOFN1g4tDkVUwkokdxniFOMxddPQcps5uyYatQkc7/QZFLxCMnpaqG/x5ZCG5Rsxip4Ffh84DiqOnhdTRzflWZDb49NsB2wucuSaVrFrjl2vDIFu7kxDvH2EGgQJXsqybmFH3kj567qKm+YzZcLZndZwIg9qVvAgOg3T2e/WDxXZ/GvIlvgppPsEkxsqkXx9utBu+0wEuquCGbLD4YVVDmrEspOnM6moG9pKfhUMNZnf2k2Iwatd+JsaO7s2negJTdQSv7+aazu3wuqIhnlqLkezYhzWNnZfgLSZ2GOOXYLpEi7tTrI4YZ8E23eoRfCG9vJCRfDLkIcYOAk+EdTIXlZWmhM7CUdAuFPgC2xkGdzrTbEbO+PWQLcU9oMinrd+nThh4KgBrrYXBX1my43IYpE3MipNTrE4kpNmsXkjQOEokH6ycyLITBv76wiUBwNqfp8CO06yRNYDBEylkqE/2h2k04JeSLfLxMVoHoxt+EGInjOSVBx160KGvvc8KS54oFv0qVzBWR+qZMUYbzMpFJO7kuRss6uhwCX1HDCXnHjpL/uNtxdRAZMIP6KsjeJqzDTaA6whfOgAGtRQ176c0iwxlWZYpsXOf/oECdXT2MF9mIHlAGkux1H+qbORQkXrAysEsDf7Ak8TUAra4J4UMcc5+appKzYZvU7h9PKNlUVOjm8wIWkzgvyCoCR5ljpK3oWiqArewjb3N41DUBYp1/1taiNrc3NqaqOw6JSVf8m+uDdNMataa7KOt4ovrqtYGgraWktxPDerqcDRLHwNvGKrSSA6HsE272mOhqK8Wd1PLSG6DoL7FkLvS8DFxATSTKb4WfQaOFKmRNYv/LrWErH+saW2NLB6KHcF/G6aJBJYZk9+0DGqsuOI71ALEuE8caqw4kNng+VBhm0jNAT5WVvnz8VIjcdieiP6IH568p6LWirsoH8vyQLgGsriPZWU+/h0F6mtwUmon7dEzLIS6W7PR+z5Vl/j2CJHGMcU+b4dUWcnfiKuNGpzNmGhO3pO/3RVaNxS4I5XVMXEVNI5gCDMGXleo1MVAf88ycX6MKcV5Bk/ygS8BitobOZoxQ0h3Dy2aRnXPFCtL4cPVYFBTxaiJ";
var _L5="LNlxKj07jNf/1EEtulBwH2N1jO3rR6o0i8MjDJV5fykcaqpm/Ess2XEk+ezk6VMnPzt58uTJz0zeZ5v1AFh0pdVdYjtDybPEoVGNbvl6SFUl0glqqhYPsWTHgVM+ewyw6koYrLWCLpF96TOQXEGkUQr9LNusOsa/FloTFbmqLNlxyedXA0QBFZ2rMQbda9wX2jFDSLfDNInIwBspVdbm9nD1aGHPZ1lhyfsWQmEBVTTlLKbqYnp2nJEGUVxB4fZ8YpyVWlgs/RTLWankbwsYNKkMfSsHEz+HokEMnlK6Upg1AQY1VIeN3qLn7MiLIYpGtdiLZYZMN1kjjeFwxMzAxk8gqOeENgM7Te1wEqygWcUN3MyyOiIPUm0MO3AZR8Pkog5il/0iU2THJfeDReNaXFL6DCFOhm0KxRgm7L7cCjafCl5lTOw0lfxrq5DmAaRMyZfCu5vCNIUem6It+GfnkN1g4M9lmdhpivwOVNDAav7O6GPgrQsbaQaL5xhsI50Gm81izNGM7DiRX4URNLGRVT4O8jFwLLQRLLb7wCeX9BzyK9Z6hSU7Dv6dvWHR0A6X+miI4YfNILZ1LwPdnjuIyWV1u/8ycHYibxInTQWxnzBl4GvNoDiEgVXH+PZqqpksVk0psOPI576z1lA0t+DmGKtjOfsUuO4THf1OiJWV7dPgkNdi+N0M7LiMLy6IRjfYiGUGzx87230OZ8SSVSdOhSCvwfjJDOw4kgegkCYTs/TjMVTHwPVEu03sAn9NobIYfy2ZDDadQs+OPT/cHhbNbvGZ6DNE/htdp9iPgZUHrgGTxWGtMgV2XPLlFeDQ9Iq7GTOkd8aqdNuQt0OsLKRbFjOSQSyGTKRnx553jYFF4xuz2uxQHUt+x7jucrgwlKy85IVwyLrcfxjYsed1AkWXiqoaa1VV8sGZb7PMcQG6D19M7y2i4lMzZo/36Dnbc/rK4tCVzjkM1jnNhot9BtXfDrPaVXaBRxg+PgSBv8CpZGTHiW+sCkXdrTWYa2uZ5ZY54aabtll6uWEArM31E2ag+AhdbbAKiT3ENUSrcziB7cSOy/LhsTCouVEA1tozLr1oEuf91PmXrgaoyaGy7Xd9rE5jyvZDbRep+VKH53qozmHJ12NkhTMdDOqtFjjw4PPef/d9zj16n/jpaUccCJgMUCxLXx2Ddx05VLoIH1GulD4+bJig6gLffZuRHcf2Y5+BQb0FWHszztWXZeS8Y1mSvHptSAa0RvyJvjo8D1TTNQZ7T0/Z4kurQysyDrv9l4Edl3weENS7wFq/Jn3pU0rs";
var _L6="OJWePAuq1SnWeCcmX4ofoWvFjvw3E3cMq8GgWgGOIyM7Lvn4Cs6i3gq9jmVk9aHkbxRGq4LB84wdU7cX7RLFZ+mxJ66mWo1gwwsZIjv2vHUoBPV2+NbL9MzredvCgKlKdcccbPNqFN0hWGpmSLZQ/mi4kUqMGfEmAzsP/KlCUW+DK8hAd/Dxg/eHrUrGTYvypfDSGqJdobLntFhZ5GOoWICzwmx2HsOZUEG9jdtsStuzP5Lf2qYl1cDJGSF89NxZTVdYnOo93Smsp6YSZ1Z5fHpi58FzSTWot8rCnol1jGH6V2Arghn2KuVL6QV0pbErTImpssjloJUAv2Vi54E8b8Cg5kZ/R896Jvqvw1Sk2A356HkGbBcI/sjAqgNvHmmkAucOup6BnXv+dh8sgrpbPMlQE6bI74lWJEtUNZT8q3P1U+zAwKpTeG8TGHRusAYZ2XFq8wLAHlY3lTVfi7EuDPFNmIqwEq2+vY3Y2hW4LrUrC5wEi85Vl3s0lqzyMhQWdVdZ8hMmVpgRcrCceSxcJTCtW9ZSvsjJkNrZ1h+Sz/APNZ2JxR9YsmP5Dw9f+jgVmLrpZgzsWGJjpSHy5WVUKoGu3qr0pdReFFIzq7vSs/IYx0E6U/l+9Ox8Dk8ChqH+iq+rZgWSd5999jukjx0xWA9ajZhlmKpj6FV1NQNeYaqs5Lnq0LHDBSzZeeKN21qH+quM/1VpTqQ/bKwDFj70FjJ0VPVPIxXpqP/EWB2xti1sraycy8CqY3pqUZWOjKz/YTt25nkeutPJ5QSbV+LZawNwDsBWNzPM4lVUhAIns51h8AVnalXgOpaVhXgrLDq22IWeHYc5M/YwRXfgq5o153DAiABiDPBn5gzltAkw1ahZ++kYqxMlRGqkZrFJMVZGLi9SxfapoxTIJVqCbhSz8I3KzYU+i5Zini1d882szRH8MVw1EIyNzFDtXWBqZHAWS1ad+MqC1ezAjsgfrC7oTsX6LDY/8Vl1GKTD3xhz0iXV6WLMmXx8MSu1ERnHmCorZ+0Dhzq0Z30DXWt0qTij6lfLGx2M1X/N4+WVwSzwU4bqaHMCXG0c/hg9qw582FjUoeRv0DLdoUZxDufoKhgMVnFY1XIcDollhpB+N0SlJmKXnpTSFv2FMHWoNHG0EXShUQeYqxiY86TtQDdOLUfsiEdD8JEcqI2TfdimsQWpw+BGMOhCAbD8mf9h4MzkI9hBOdxPLAeKLZkagr8AtiaKG1K0ZfjlUIN67CRdIAV23eY7bTKwU+UvN7NmEMZu8krWrEszwOCXKX0xfrCJmloo";
var _L7="9mWkPbgfippsj9qJFYx+LJAhsPOJEzAwL2nhGE7M+n6OAp/h5GObR6GohcUD0VdWefUYIw1lALf5c0yelape2wBO5wZs+GrUnDHjc7DVWd0tpHw+nSu2HgMTU3WsA4ImEgMsctqDZGTV4ox9ATHWWh0z5jEGZhYfQJDRYPv18pFcEVIDp4elkpUrFpRGsgAOnU2GxOojeeGGmOv9vh0573LNImLoDHGi2HwirQ+YKgtuEovmsYLRB7xIhsCsKXL2/bvvseduV7QTO89aBppn2JcpH8s5e8Nl23mHeyjcyc/cDs2jgPvxi0SifdAYuFEeWGwxs0zVFT88QCWT7Lj6cqXNx9/BoVnEGCzw5XtIL7FA1RhjpCPE2xcxkgVOfhd9dcDRksvs+ch64k7kIqi8S8QCOOojMkRu8XY6GwVyLxKYqst6FzaPmP3fwRd5j5FGUWDhvSaRIbDbI6eMM5JL7GMxVlf67hJW8mCvxB85sdUgagRjrnyeTIndH2YcC0Vuh93Zro6Jk1FkUb0O+QL/UWhTiAVwwRwyRGZULaXNi9BCdjVrvBZjdam/Lmgkh8M3SZtPt8JKQyiw4mefJ0NkzgERi0hsH2htPlh8sQzVIY6DZrDY8c9DvngFHJrAKDDquo/JyJyVMH7GIkOacgMM6iiYwpQhbKQZxIy4lcSd+JEKuk/UAK01niOj8KcYyDnf3RKnnutDzBUYv4AW6tn6IGVI/hsmg46+TdUw26HrxALY4vL3ZtCLxpDI565cDBDgK2SZp+TjKw4T1NPiQPrqKr6ymmplqqMp7IGfE9N1QGvLBxLJSH/yJfmvPRcCjEHhRm3zBllWF9v821DUVuywG5K3UfJ8uOpwYSxb8v9dH7a7jLpR35hE0qfEylMk+dfdAVjB3Mee+AlTiJYYyD9AtDZw+AnLhnRKdWo3n54hxIeWNtpNxgCLzSJDTMzoyXev+N76KIxg7mKA9b4fyFRpczF58vbvrC0WNZKrcoR040JGqhFZ6ZRHki+GJ1fRLhIHrH/JSwyBOUPknMMXB2AxaLHAiuc/CRARAhQRg+TTEzdGvR1+lYOR46HVAIqHmTYfJy1ipVtEgM8fn5g3BpJnrw84p+hULTDw0i9+9mc2/fpz+44EnNbK4tLgO8KKlRnd+t0gW+D2MOgSA4w7fyZTiBmUpP/1foARVKoGq9XqsO3btv8+I/++fdv22wHACmr/PtXAlSpzOI8lqy5eD0U3iDrFwO+nkhL+lMh3rxkHGIVdFHNdcLFFFxuFuVpBF3bNl1J1g+sa0w0CABc8TZai";
var _L8="MZBzHlwGEIPM4pzDp51zDl3aJdZdSp9hW9RtRxix0A1/egMZEhtj5NQ3NwGsoJbyaXSvdofo6HtSzLBV7TazA8DYB0oyRFafoid/NnQIVNAb3+sKOHyeZWMkPwcssMNrTD4wYyJ566oADHqiyPgpqTvkjCzb1gzyb9c/SkbmDJHlpH0NVNAjC1zDNrsCp2VZr3aJpE/MmAL59uYAFI0pOvfKVFf8d4yNkzwVmgW29Tv6wdH7wIxKiTcfshDEChpSnMM8TVXO7EDPxhFnQfI4/JRlB63Jk/wGAEVTWgegWG3V1VZbbfXxUFMRjowhS1wxw6k50ruAZLqqRpGc8clBcEbQlAIs9uMfPMi5fxnQCtTh+BiZheMzfDMDIdw5qtA8v6hLSm2+84PFhsOgOQ0OOPFFkjHFGKPnT3eG6UiAKxhSjhgfWlSlItExT6WyMfArcFnk6pr4RD67NACD5mzhaJLeB8695AtDYTsQtLZnTMzZ5tdRoGqD55k+ljwNKhnwg1qEQL508EIoRNCcgjVe8nMSB1vyiSWgMhiRxR9myawVX1nNaGUqp7Ma6Hm1c0alCqOuWOHfMWRLgfz1vgZQNKnqdlMZ2WHka+sBVhWAqlGLGzmHeZMPw6A6LBTUwTZ/CADakSgAbMWSmVNJPvg1AFbQpEbGJwZ2HDjzvrEAnHMA9nrj5dmB2V7SLCuxWlJ7yu4H7joCdnDWwl28yoF3/jOmPCmRb/xYYAwa1mBfelaYyDevXXUZAONW/ekLrKG4NbQ6McNvYcjxPx+cvCYKHeRqtdrjFhYYyNc/vzDEoHEF76ZUBSrgP/c+cO/fgFJfmPOlHDDY5J2QskiR/OMuGPSVN/+VqsrqSCFy9v5DARU00eusBirFRmXRX/JbYx1yOjzCkAUYA/no44/N+7tA0RxInrYiYAVNLHijMkARIZaY/NT9YLOofo0xFxkSBx0hWlNI/OinOwJG0MyZlhviE3DIg+PrwBQGWzQXydsWBoyiqRvC81QxeeBwLst8Nc5i1g1rCoxBcwtebYDI540is7pFX2VsjILvbwJA0OSC6d0X4z8WstlgcGi7KWripXNWsCpodMW5KXZbCsOhyF/gi2w3QfDkeyvBKpreYDWGLkvkoiILkGLBZ1h2XfTk99ZfCg7Nr7LmWyF1VWL6rDNYomLn2UxbLJA37g9A0QsLfJftrgpTdoGgngbrv13WFkq+zcfPAoxR9EQje5QhddEsHo0W6trCmYwtRPK2oVCLnin4fYxdxJlbWlMbOFzE0NZQmaYes6tFgR6qugrb3aL8";
var _L9="9+lrQlFfdUt+VdRWEIxnARD0UjGL3U7fJev5IqCos2D3M39LLC/45FerD7VW0FsFuIq+KwYcZAzqLcDYp8lYL5/48RboyUYWmkpfP+/5o/UE9TdY6OaZDDUKgeGLK6Gl0oNg7CrP0dctkN9Edyqw8hOcE1M9YiCv3gZQ9GjFmAfZTnUKnn86CM50BUQwbCLJVIdA3nPiTigUPdvA/YahPtGTZwAGXWtg9/xnSfpMPpBvnA1A0ctFcBl9WZNA/mI7qEEXC4AtXptDH7JMiiGS8VoDYwS9XSxOIEO1xRDanHgiYNDdYhTjv/8nEiIitHGDJDEiIPmHa5YEDPpAh73+QkapQRUkebXAGHS96Mhx2GzXb3yP/x8jEkDA+n2bbwBA0B8a4AvfBpQejQFMfnyPTQGHhrQAcNxxx53y0bSUZpHktOnTZvNbxxy/IQBrBf2iscBR908jYwwhhHmFEEKMJNOjxxsAImhGURij+PTQIVtvuez3vv29rw8ZPmS1/QFAjUFfaRRm2FE3cK5+7oFzffM7P9jSAGoMGtZaa9Ghsdag/7QAMH73u+6461HO8667Jt512fjFAcCioUVUxTlnRUQN+lSBEXxaJ+w9YcKEvSfsjLk7p5jfFzXWWszbWmuNKv7HUOw88b/FAlZQOCB8KwAAkJAAnQEqGAEYAT5RJI5Eo6IhFkn1YDgFBLM3fjHdil+AEO8XH/O7Ay0XWfyp/sX7ofN7wf0ddxe9f9k/aH5SeFXXf6ResB4v+g/8L+8/lT80f9n/qvYj+ofYB/in9M/7n+H9cj9bvcN5gP2l/d33af+H+1XuV/rXqAf1D/Qf+n2tf+T7CX7xewL+23//9nT/ufu38F39h/6f7l//j5Fv2b//H++9wD/6eoB/3PUA9O/q//Ofw6/WTyB/rX4rfsx5lfnX7b+TP9s/6v+l+KnNf2Sa1Xx/7N/k/8L+6fr//w/AfgBfkH8z/2fpE/GdhBsX+m9AL19+g/77/D/lF6Vmov4H9gD+Sf1P/Yf2z2k/1P+y8RT69/k/26+AH+Xf0//rf4X8y/pS/m/+t/lPyH9nf5h/jP+r/mPgC/kf9I/3P9t/yX/2/0P/////3bevr9s/Yp/Vf/W/nuhT5eC+zmkUz6NTmoJgnZDujabvy/Zqev18WRHYVIF8kC+Kt0ZRBJ1V7dCImOzVGWOH8z+W/0OIgIC+SBfG+4PWcXRdGukIaDlUhMQiJgwvzmUoyh6Sa7C9Bv+g3ScMMzqcnmVLRsLHgGBHRfugDwryGNbNiRThuHVbD0jy8G/6C7+TCaWj";
var _L10="eaX5QzaW+aSpNHq3hrRvUznuqOE0lmvq6WS4R8ho99MhbLU1Yg103URuJgpf98S+uH4dXVHLLjv2AIKpaGkpAvkdqBQ52h4sjuDSQ1cDxuHabthn2DIJ/hSE/VhL1dAXyOKOH2mp+UyQypu5O8s8EvZULq6gH+bUrCNa5Xkqfnx3nQ84t/NJt5Nm4vKN4kVoN/zHOx9dOahhIzeXLr4nNLkXdEf30f9/gMcRF81NHzBJRVPIWP64pEN/+HevCikfoB6C7+qRj3FcVL/O93pcFCG/BDFQDG7a278m/qdd2oyvNdkNyrto4e3pFbLsMLb4aM5FsDAtvOUEX0fdJ5aGohWyxxgeJrcuP/q0N1O5eB162F4r42+HTchMAwQ01I4QEH1ni7o0/6X60HPX6hoggDjOx6BVGbGVyaplli3VbKghn62f6WMBNd/9pS3L1rv9kzp37vM9o6jXtcuA0ZL+5ELLyZ9pWzFB0Ny5+8Qi5K/cY4Gy9dNhqF+/DEH9bEkusEwjOIV9+b4Fe2U/8hZjfylsGyTJqlki1yFmdF+Na2fvTQAxs/4+9vrw7EsqqwN5vCDuCetyVPO94zIh59ks2dbBSLSqwgvNg0gcRPLO7yr4mG8pU1zAra9SHOHah+oOlYaihpWXN+Mr24GUKhP+EzmeSsvBq2YdIF/oRpY6rFjL8ZvmWYh5H/HN3LgTCT/bp8ck1BOkw9m0+3rVqvVN/KCm2s6naT4h4zz+hSIxxvURzJdFVG8aPI1b5sVdg8+Q6oNxFpwB6b0kc/9m1cefQWUOWCQCSnkGMVevGgL1ecCvtDxKgPom8CGVsxITH/SdhTAHpNxEXJ2hRpGUX7pZVlx9qliySEvSpeiAkKKA4ZI1cy4/rvpsw2c5DRzHjHUw8mqv27lcghjtd4UDK0N4AAD+5dOB0/eaFvzG60hcjVQFtGk7Jk4O4r7b77/abCjHw+caMt2AoxnlZ3Ahk1UkW5RPlRfBSnqMH7LXCDmESRUVo0iLV3BJnSnd4SfP7o1WcokHQeT5PnYa8vRah/yAYqbjF3yUB1CtuMsSVaaUoQ3pnlUIYRqVNFhizpLql2wXw/uMPGq6cli+eCj/c7XxeKQY39tVqqGVP18s6KJJnq0XEer/S2gyWKw4DBlEaa2+zs7S2/PfoIBWWfuFOY/74njN+2yz6SoMyepsBDPGsZOCyzX1SWBH2+zjSadBA4jPmwhA0geLi01wAALpLg1lrbwj5ab8LvWvs7hxgE6Y+9r0xfFNINLXP8AcDqbHiDh2xU5pH4padA1dpiKj31Bh";
var _L11="ha8koi+lCIh3z8yihJ8UHL3Da3tBYsx0y312hDMaG+yW/Srny3KVwePGf5b48QX2Z8b03NZIYnr/jUaoffcpO9Q1gtHvm5Unm/mPFMR+hEPE6dWzLnlY4qy2WcXol9HVGDezfHQsuN66QJySZ+t99g+rwOFg6Wqhbz7ONtviylV9QJ1psmCKreihUohSrmD2IqvEpdH2Q/NtexvHABWZ6V6tJP2wzRpG5Ng2+NoN46e8IN4DsgpQ+CUjdezfvqzOXzQGami1lceA931ftiD+JtI3xn3cACd+jbyTlUgnNcTY28yS/3/rku7HMHLb9hvGDhU9tRXZ/ijTxCq1sl++tus/85Npz4muO69StAuDBWB2kNju8Lm7CpST3N9nrXVnt9yBTbY9wvftGsHjqMrE9U5dDmcVOQLIemOXRssbX421Bv3xD7OUsxMES+NHTgIctWDVO90bErVyDr081pfEXOSxdiQFKbTMO+HQsogaKUCIzGIz2vhVwY912YemrLwuoMRSM1Fs1jp3dCBP8uKnKjQcE8YgADaV5DekrsfVJ0ZrZTbg8fzGlaeQ0A7raoN24Khdo0jL582UM1o7TPxBARSatXNr6hsl4WpbFW9w9TkVuyjdUfc++L2OPsYdWtaKHnpMlZGyiAS8Su46stNVG6SXDu1OMsqaAbgAe4VTWGbIh/xRMPenklhhBomnT4SJ368TbH64J8G0tgCP7OjvEWcA4O5UsnRWMKaK1Fjm3UgHwALH4m1X/EGo2gCaNg5kFsUiE34b7iR0jeXfGDpK9EUQ8e5Bq6RyxrymdUZaRLiJCpk7F9a6C4QERnFp6iRjnglvGbeVEGKmQ+Kv7fKjRzrO6l3/jfO9cspsiWiVwbdACTFCYZO03q8n5FtG6lAFcBYoRsblBJrRqeBM0CYY2EGQyQXeYJrO3m4eMmyouJI+ENeG2T9cKU0XJJuLVB+Blh4wTg49C9sBzLWOv0MJl+tg39MzkTDDuF0mBHXtqD+ZieRc9Sm/R1MQMAJLtaBBB8ybT+O04NROvp0plBTTCbw54T24fUOghLOBgktEqY1XsZozfF3VJ8pD44a4ZgQXKYRFWmeOxLzp7lVWZS9xkXE7PPPgEtNJzrTRILPfCrII+EQ066Htn4dEAO7b5KXB49QADrzJxGtvDNeE8VygS2kiBVvH8vZiOsqsUnm3HQbxKFthQKLeKj+BEAM/kxCdO7IgS2BYxjVXkbTlyv8oi0axYnr9ZzJAr1AVX3mmbJ/S/3U7Wp7FSPSHzsZrxUaiBdu7Pf0Y1XCAPwZFVb1s";
var _L12="amLgvEZPyYx1dhGKJF50yu1ll0LdfyYdjY+DL8j5jj5GV9RO1K4jIG42oe7vv45vNitbMY0QEDa1b+cTfn2VVRq0MPVYJUYF0jJXZjOyaK6rv48Mya/C19tWVIZmbjj5tJ95LqQPNsLXdj0bZR/PpnP13sB7bos2mW5/zyQzeskcpiX256JDZ1jCuxXBag089mVSbhIB3IB9+ZMVaWYmJQBYuRLO7hzoK1SONJiu4PUJ5MY8VCFx4X90HL6xr2BSO2y/mln6rQKC1nCzzAfG/bQV286lgxdIwL1dYU8sPJH+VIIaUry4f/LkQEY+PSGSWs5priyNv4sT4BmeU9YwyxviQmGYgRO90oRUFDqWdaqbzRBpjfCMuTxmzAnv2yiaB0YccE5cIqQYVOWlcAmEQP2rQ/s9TUXk/5POULR+f6hb9CU5jgSiJuMMwU32jH5XOC8+AgAUKUyVr2LMeaF+SbK0XRGYE6WfUW7gwabkrBm41iVz4/+eQS6GgHlNIA0tQfqTfYQU/EVSSM+LbnU0gFVeJHF6uNu7NU2BCyNDwsD2GX/rbOLq1NNX3KqZ9uVT5GW2cjeZnueE2lyPOsfl3rF3Ztcugl53oLEtaAc+gxrVV7sYnkAwvzK4OLWA5RX3objRCkPtuptc7j5deoPLSOUQbsrQ9RgKXgFiVhvT466+c39xYvuXQCaDE/4mkGycc77TJURcyPeC24bQWjo33E0M5PwhH3UkqAXXeV3tPSJVBDLJFP3Wh/iuEyiFQlMFk2oCeA4nIe+RjcRwgOtMcMMN1qpwikHLZx48BYvl3poenpwpASJTA6bOD5cP1CrBPLleIzlhnddTXZC6GDn00tw7/XVUQwYyYutBTKG8HvBmRXkF5MaJBdQXZ3zn310r9t4E48/g0lY/AqpeMvLifrS8cWyJG8hTJHP2SLoBS/Sh4rb521dwqRYi85PlnGv6GlzA2uPzGx0ap2KEIUZx/nDmewupk6sg345M1W+0M+8ifzXtm9k3AdYa1utdo57HEJbR39Iv3q7ufON1tYQ3anI0Cxg0P3OB0+gFjU7ispfXPZEiOVqgpNtMwpyTU8fmkA3URWGBu/RMsXcGIBqhBE4a2jvHTpWLYMDT/XA8HHl3N90IQhV8IQawb76D5kmKmSwYGrNX+hIMv6yY44IXzWWiGJPgxqW/lSfUAl3o5gGBKC4o0+y3qpAzT7cmIc8oLrPFcXE7qQ0EzY4/10Pwb+J3deRR+GEYQAqIKhGj1jJFgeDyo6RZYvJmO4nOwm1v1I49uzD3/B8tc/aUiRZR";
var _L13="FSntGrlEIatzgASunt9ZVz+UldFTLuv4tAtWl3o2pFh81dY7NaHldUt1sPaERjmjt5NHz1z6O4q5F1e4WxDsHzegW1yT9QkYJyoU+IcQ+/nV1rkbGzbVx8XrCJUwGQirVTgEQ/UZi/jngOxLOdd4HifyEt8Qo/mob4uCs2r5p/3/egsmnBa1OWpQ1cBnCdQ5I48Gz+ZTbTE8LzCnmgKtet/WCBma98yTm5w3ZcF1oXnogbnS7wJdJVq1TwMNJT4BToKYnQbT9CJeHc7XjxImPvvrrX0EAiS23VAMQoU5uUFmh8dYMxpR0JCcH5EEOYY7ZqQ51qzHp/hS28fJ2AHvutuNRt6Lftgm8660QI13UDMsd8fGnQ3ZI6gz1weGb+AWQFp95qO+pyBj+X0I+9zTrP4ZlspJmtIp1Lq/97HIj7B3P3xAcZ+3ExsObYjkMECaxj6nNKj9LvQ4RP7Ee6NKXY/hS8rNfTgQVlTu6mBChh0HOvA32Of1FZd+7dZaM0EfC2QkbAKsuVX3i4C5KNgnfGnYiUMHveT0Q89RlMD5sDREw7YJgh/KJtUFLri8H30DboAtHHNgDTU2MYnJRte8/rsR8A6IuXiezlNK3hkvZLlJr/OrJtmChtqPoQoenWjbWjb6LI2ADkStkqJrzS4AAH2YmhEGwcU2cYzYoosXD0NA+8HHQlYyvnHuvmGUyFe2GQLdZiIIvOKT2ah3q42vH1rbhKbRiWjGaMlImXJLUlf1KT8jRU+UujRE01M60yzGJuamfaDFSKXlEuNUMlJ09+x45DITd6GQSXrNiQKW8x0k0bvan7WsikT95m+Db2BFuReohdmYgvbxyDMHWrTZoE7O8qKnzHVL1L05qMgYF/q+lDU9qmkA86PUq4U5fQ8ARD4TaqDcd7EzA7myl2r1nP2pfVt0BdVLByW6cXZOnfkW2Fp5aC9pQM0MYnen7smlh6NUTWs95iD96s5dGwyxaYI/Pup5cVHuZ6BzOEY6b56gPZDiMj8LkwdX1T0s9bNSXFM5DR8n3hiz6RTblniixhm181TzGzzLU1doUsI1J7jJnbz1dslhR8KYtS2ldKDIVQG3E5Fi/nLx3Yr2BTDR9LxUeCrKsinwiZqLwUL+RHyu5q2InVpilcERtq99Y4ESGHScuNl67/FlRGevuVIeM2JIxWZnZn9BZvMRCsOhZrdlAAQ+Zr8vNPawvZUCqWTe8YGHPFzLntf+a+KFPp6YHJT+6HzSvt0lChgmcADYMSm60CMDTQorTTY5u7X/f6i6kiJ2fWOyGwEGS1qyVjiu";
var _L14="NaLO8sJ1ehnt2hzHPvjVpszzgupCl4y5YWL0LJ26EFC7gfbbvHTFhrnrMsN156g8YKWjDXpfazpcbyigUeJl9tfbj+0urZ3k3sVhJMsPAZDLE/j15blGBY3xYxP1Xdb2Poje0nCpdkdm+swdCoqKHpP13aKaFoS/C6yNtiLB3/Xd0bB3Sr64lZ2679irmhODwwuSulayGm6AwtCJ/cTtA04v5MrbYAj5vrLaBM+eAH4TN8K7OOapWAtgGSJoDDqPGMVc8pM/K0BoVYSoFBmOtCt2kj+Pi7uNx5aM1Id1RZK7FBjCFKoGm1KaTngQFXEoM50I6leA5w6SHgnpOCj8hxvm3O/PnXjBKDxHKxqS1JT/73+/L5JEqUtqPlXzf1HEF4mEjjF8uFj7wXEK8i+8QeyrDzzRvhGX8RT9yNsHybRkukl+pT2sA6sSQKb5xyoeL7B9BTyPhNgyxpvXAz8hcEAKC++symXKYNuXi5NkvDZS1y4cs7mPibjJs4t3IigChP3fm+vtqLyUqloOgI+0RMQFaRREZf6ILKvF49Ank6GWYNryD15NO01omK9P/3AU8BRslB2sC/q21PSC/FITJsi5/jmo4Pts4mhEhpb677P6s+g8A/SjGnzSNJ8aqVHKHv3929Krim7ZnDb7SqHu3iPC4arvQv1tecFtEGS4YgvasTVLMcxty+iocdJroX4NdOFCQkrikV3irpCmYwNYOSGmYNADlsGlQwAZ6Ry+go9tEl1ND/egQw6iWDQHQGRNoc7Gv1xXyoevWsJDt8adisl0md8UrwJdj/fXJ/LbAw0HWVf4oMu7VvCKNsRZi7lp84dFYU3Zu/6ULyFeTj5UltlmFEQMsNJJowvbKucDot/43+OIfP/s6s+SWLg0Zwz42Yu10iXfNIIjLQdkK9xoSG4Tlo0TsXYSi+JGcW3DQ577ZvfYat+70/mQtNa8VmJEbM8moBCvkBmuKIHElJTTTWJnUhrqqXT1kVDaMEpLoYm8ayLdXf2CVIHGokOW2or/v9o1riNHTU5N8Z+N1dsDkZBnxqlA0lUNiALNnKCDPZyTGtvCWjvYOMMlXd1PGSDq5n8bt2jC9JHNbl0UO6DePKuN2BpNQJpju2ckm/tLxJf00EmmUNhrAz8LyxcchUL762WleDTpLQElzkabpwVV+I7RWuyhykbOAIl2m6ZZYmZH5dx9qxby1ro01RwJ6Ub2MRGzyq+nRsP+6ozy4U2CTMjm85e+zBx8jOGpxn9iiDZe507b/d/MUP0+ZQh/Qhvpco36Ng0uqxE4NUA+ZuYu";
var _L15="sRyy7Y8bMULkzry0bJ4Jr5MJ7LNidbIaza/MlTHs2dX86Mz2kniTlEjjEE1ePKwoBriG3gU3hnsk99gg7FhjxqsVUppMiGsLvrrSXJ+/9INwmkIIzn7CTrcGguFdE8AAz6Lp4V36JqiF1H2+qGdHvcTYYvuN7VbEGloqMkgpmcHDnXWVuASdNHHtx/RnI3gPkgcnEQxrpKo5ESw6kuAoj8mI4bhpmFObDfxRhBTUQ1xbUmEHBxmd+FQnu6wLJ+wrUO/EQrn5Hk3H57k+06BTxAHeaWTIfTaadzrieYyszok2YlbEW77G/2Pts7N7dxTSXY10FhGKLsbITksk4IwxGhc295cUDe8zePepOajIhI937Hkrb2ZeFWyZqOmb50b/uiLNGrXN0u2iM1rGHlYNKvMQDSmrG1uTauEeH52s6JbN6A4Q0+P73A2k60S9SqvYBo2svO4wbbZFXylz8cx4dkREvwRIXAaO6BgqtE8/W0rs1SDYX3SyaVvq383IMumuRnoNcq3cqdIhe73Ti+FG4KfMoc8aikihd+J7cXjyEXC67lyxMJ9/gwQWTcBZBQDWi2ZabOax1YdspHvMUEHhzahCgMJoifQ8ocdRyA4wWZgOeRvCOaL/7UjHpSDNKtnRXzZeeb/D2hMjotbpwOGo5e5ao3CqVIy9TDCaw592ZEZvPFxcYQO8m8xlIvrCUpais6w6IizGPwx1Oer87uHxD0RzCmu5kQ0otRWOFpk17OSy9fk7v2/rMRL1IT/C+PfJHi3aa+/7uuGLl5crtNEIXY44+15DoEV9Y0rDeQ8haTsY1K+o2OD6I68BqNl7xUsJK3sIuQt8ZuFRSQUb9aIhqUb3Wd6YSG0wiKaMikEOZMGuaDcE0qP4XmwdIon8idThkEyEFC3WAtMBWVUyTzQ+x02i21808Of12JFJym2+doVkt95qW77wq568E0jU7RIxmsfZe64ey3X6IRo+c207fFVRIZoJjEbRpLJ++KuzpcfGCqY4RL0MVELhdQpSX2JCCnELIIAJrU2nFr0dB5AXUXc0GhqEtl3x/KjZ9XZrPrBV0mDw0XVjcy3gjmewht2qGu5qXg8NsU1gqeiI+5uDpMJLWt287mxa1edM+EgtvZXCQsCIahmMlwHrVxuBVbeR+vo/AAvLw4+ebA1eYtgkiuLBy2AJwzByP6jcNJ+JLy6Iio+CnMf+HhdV+EPLNueCttKh62TJq7SzrirKcI6I55Z14QN5KNWFu5s1y6RbYl/Bu0x+afadiSlWKExv4fBPq6xT3RKvUVhv4fma1VJN";
var _L16="lBWEPiRL0+5ZxSRpYFISYerb220d3H0a48oFR2VWsmTxtyPTzoFEZWsaIUbJqcCcet+HV4ypzRSgBJF8EnlbqXdnB67+zIc9sjxEkTZHO/Gw6ISeNOOjLYSeng8iJA/0F9up41sB10uW1bZvs8WpSAXsOm4W1z/Fn7Bvqma8ZPKhAUUo5T+CqsXb60f2WlkMTaP6m3SpPlobN9Ve0xKsf3fQp3l5PP/s66El9nJ0RRhJttoy/RIt1MSj6pMA+So8B/PF/bb1q+EbtllK29OD+pI3pI1iK6krNeEGwpxmduH3xDd/Hf6JvB7fWJAgJLLp+DRxR/TrgooN0Zgiq8fAAJxZjWp4LuPoajF+v8ssYm0g2hbkREJtsd0q/UalcA+JqeYrgmecLzw+aBfz9kwXmZYeFc9BI5cmwzrjBYWckeRPsyTYycfFm5afsAE1ElDdMAtVvVhqvO5yR+6psqhSVA4sXKUWBTYNF5cKjaBptZ9ddhE7RDC1RFSBRIGQrz1HKkox8eVPGcvFSUzNgQ3lCLqd3FSfeuTSh5NIlF4dYgxPmZODTsmYDDgktsSnGmWar7R/rliQr7lAXFWyhzECYKSKn8TSuNSzuD/JmaBSRnTKq/fMFJb4d2Nv1UQEMhZ+5LCCCO0CgPchnpDa+lQNUYC1sjunTDjnhqvwuHXOZeRh+il6zy3NV/VNHU80zMwV89ATWhOV4trZtURdCpsK/PHMNpUM44I/Dxzxa8F4XfnU3I6mprkcWS5AqMt6jL8DTC/gMXILLsntbicRxUy82sLSP6bXAbZJT8i1J3fNf6slZoeyBhykSOppR/vN9mbs65B7hrsL+XVLZo5/Kn6zDXHKCVp8FZNnd+gplo7YLeRLhLYSm4wBeI6K7irEjlVtFEfqdPuwcTBubcOrtb40Hrs8o1NrxvB87re7Ipg5sCSDxUB5uNuuBvfFY1z1S6NSrsb4FAvopXUlNBlxVWQfhAfOudtHpjqmekiWbW673UeII31dB3HtHSAqjuCPJiSZaPIcpqP8zq62hl4qy/M6TxdfHrUU8qLW1OrNHIHv4GyOGMEi9yD5caMwxR7KVX76WxARsueIOW08M5IEEtk2JXPo4Hq89SqxXkTG9EPZktObC03zxj4TxnmQFJqpczTKASWHyEyk1LtGHjOPXxVbqo7AqsHazMOaHaGK6cIkUzx0Sg7UN7KSFs+rbSQfWBEcKjoRGJmTZv97bNHp7ndTN1lH/IrWCnLohHRXT6t7uG1DpqLNRmjL6h6CCbk450/PH9LOMqbehxu+48tSZXcD";
var _L17="efQbQYZZap5sDJsJyTSWemIH1tjvbGyd4JKtIPnZW8suS2BLS/62CBuuCnwhoQ6r3KvzmKIV+3Y1QcuZbzYUmbr6K7UuFVKvT83Qrq7jqiVNc4nlj5wiPlm+iNJww1mDXrlqwqng2VrH9Tf8iZdPMqLN4Wujslv19JZea9xmqtfAGWw6XsGL2RT1tXsol+meg7xrfmMd5YAyMkFf2T62Yws0uFEshOyf90nFtqTn2ysuYFe7EaQ/1+423pBq0jPxGWhIbEhsPAqZJizXtxYyWS2N5Ri6xReOJcNk9opWVryQN07qXgWQJS4pOyyfGndlcXosFv4fhyP+fLPEusDVX16leq0aTbGTmZop73ZEbnh2nE0DZ8E3dTkGolWk0V6cKjguN4cmfzwT9CdJ0FvTsewewDd0SUvEZmhe9sTbaqMjDPbuXaqlCzZ/L71c7G7+Jzn/8zmJ5e8dAdKppkrj2c9tCjMV/qQwfG6W1OTIHBnb/XiyGF1hFb+qINK1I0e3P6oiZ/u7IA9ap0suW4o9VQKr0Xu2y7OKAzItgtPdkSIKFXPnQ50IPzVEmIflIyAfqMbZIOhoYXI5P7sZGDI5ET6kfplctintCGV2o+5S8eokm8AHzGGCe0Si/nSP3xIhj71MtzrVE7kx0Qe/S7IfppElXrNkmMdTjSLaReYGs6+e+8SL19FbaIrL4vNL1pmhPNCzXfcInOF5C5h0Dr8F8TFiHJI9q+QHtg+df8YblhVWqub23pi4Hh2A73Fnzh6IzuCaoxvgIOYqLzl98QF4rZ8vekUacdtmu6hna8f6g5dsowZ98+a2XiV6fULMFM8/cJLzQLdbP+NhelTDJtLI3A66Y1lhiJ85U5VbWd0xT+Zx/1RDH7oQaiFg5J7pjVhhZzKBWorx4NTExg5Txs7ZUUavu0Uawn9rCBGZK59KOwNZZBd2Be8tRO1YZg8PVUun8fLj8r78YeMFUJKsbkrHrqfxcKLQVyiRNlldSh5BG1UP8VaaaGLRxe6cpMZXUXUIcra1f4KXKNVbtp00WkgOSV8bS6hanToij6F/SINOOzg/KqWEyWTfqb/6Sv74LHIHoszlc+rbEo+mXPpRqCDY5grOtsB2cswE86HDTG//EezaF0N34bXPuih7Ud4Coim/QXsCjstEqDYLTNnSwIeFifnHPiuQWEsooj/avlNMhZhsMcg3XIQorYerdRb6ZF9z42VY18/XoxI4U+Bxa1oAi8X+O4qk5UtbK47qkET2zvuJQrnkgUGMdrIR12hlwWomWFIhB24AYIe4SVHrilrh";
var _L18="Qwopc8Lx0/ogNI/BSRJFZU+Uwq3uuokejMXZpB3K2qMSkgVN8M1ZO9gmatkekPqWsZnY1EOnHJAL25nJaH28sB25CLOq6ZdXTR+anRIAkdFayi1jn6gwTDlTSDTC4qs952lk5l1uqDGPzS8voYkJPt8mckdzUafdLAD1AAMI1He/1f3fhbI/s6wjf6b8raTYsuDgqgbOr1j7zPQFtZL3JJUIWRW6QvvHFJsWWwAVHPvxQEgv/n3ZbskHf7d94E5bK3aL3kru4bh1bZHpRz3yyTr8+n2cmTRE57YGKOTbQicYD8nHEUhongu0oFKCsHb8h1N217IohK5cAd0eX6Om3ZJ0DB1gLTNtCzEvxEebcvvj5e1XdqbjHvIKMu8CWtKb8IPwcoz3ecb+GFg/HhlK9tXpjhBu2tT0nKXHhkd/aVNOHqbGDEOT19ETzRlux+o3mLaCRxLuoj1OgdQmJMcf+6KudINCFXcUnx4y4AuXSs6Vq4bHKRrfTI9Aduvacm0hGl6Z5W8Od9hJlKxVgIABi9lsHc3lg1YXd+who0qrjAVRjvt26TMVp/N1X6Lp1p6U1ELIL1SS2n90kOexoHM8feQfy6cKLjvVgryoOQG9j5XqN033FjgjRv1zlTlSBVH54Pa9OBHEqMmet7q9x2lVDdbnCPnF2/M7GekoQBY5X7gabR4JHP1T+B9VRaGv8t0kV/qog/s6x177ivHo+pD0vKLqgEFr2Aey/943GkBeDcja7as4adeGqeHe8LS259v63Rrb75JP1DOEI8qkli1bnhax7kUPkfuPRfNU2iyhK9JeNdGNaR9GkADHG1gg+NlbW6Pe18D0oX3qTTV/ngP3THJC8jQm6UR3A4t0zDciSN0RraWLAxAED7o2h3jMv5r5Qg6ajB3cYahaVSCk+Jyl4Hp3tQjeit9scKj2VObyXL+/wsnbJ5RresywoRYnAVxvW6qIz4a0p28vWfS74PEqVIXfvkbdvc3GuXI43HXJu0WUrEs4AGymbGRs81hn/LLRv3e4yTm1p9N5ulY07BFNVIih+6kCUdFpifrEdHIaTv+JP9Dt71pRqfE9ggZGUSQVg2g02j3CUE6qakAJTtAJfOW7HQWJGVc33qB/1kr5pt3XKsQkkcMRHm4rVUkLDvv59Rf678IkxUW4AvTiZabHBlz1CF1dWhmGaogh7xVHoJjY9m9wGU/G4vfFoRFSpMjv9rWjZZXoLUG+HZyI++o4mBsYYbGn2kIP0bWWZ563lFkq3k5QKYqiV0iuu9JIMyaSYlYzX+VeRTD7S5JM+6EJ";
var _L19="BDOOzOjwc3OYx9oAJeMKHkOgY5M18LaCIykalTKwNCXecf8YQwrQj9G3NTBRh0DuvI/1XOrK9hl0JWRjdcDpcyw/ND71hIkPC/BfWnMN221zlzQfjQqSEp6giFksQSOUbnnxq5QL+Glm/zM43iLDH8ljm+uC8ZPjhxypMPaSaMPPtdfBshABIHpCoJ56YKkqucHYP69C0uZZa69IJrYF4yfrt9TJzruFeoqYUGlhpj82BmBldjdPI5bXyEumQ7tiHFcoKe623t6x+ez8R+1BPmUDOPB3AdRi/ruRhljDcD08ubSPGnFYJBgY+ZImmqj75vdHAO5JYTudZx6V/KP3NHEHtB1Oc8TyS+aXM0tVbrRYaPEgyZMZ8DJzMcpsTUT3J4SFov510BiEXcx5Bq8HoIb59DKf7nV47AktalFuGUvFtuXjblLp4vF1xNItsh9zgVKCaY8Xf53+LVHPNZkwRe1R5INVBsSSgw0g4XluoREb7ypfnWgGXAAv6XftFgg8qyD0H06tlDj5H2BC4zPC4UfBJiP33D19AbW8AoMli92OJ+TPje6yIR04/9l9XhbNMqPgWnA2xVy+IU9ZwLXCq5lMSkNJ7R+m3VvX77vsKA7kUqDQa+2/+Ks2qrKkkgNu9VDTOCuN820PuAA7EOD6TTPxL8bNnOlAQsmgnxv5Bi+NWkuTR2/dZJu+Ec4m3MaEdXu0LHDaysEQFHSSxX/F59QuYUQIwOlf2xcuUlhhMbFzqwzoI8wOlQi8T+gE6TZ06zDlSyhnGpF0+AM2uJCL1WemLeXxNFja206/xBXB5xz5OePXj3M9M2u12nYFxMaXd9S+RLYM88yvZO9/maRuR0mhRpcWshJEMSS8Tpgvxlnwise/n9aH9armgTjD7QAAMr4fJyCOYKq+569pWYLFn+3V6KYkJoO//jkR8a4it30pchyaDdIvTSsRruVuknBfllbFDhzrAK2JOC0/SKqGH7tDMaFm5+HHyrDZM9aP9L/FsGSmqhorLG+cwJOV82rBk4tUhbz7h2kD/TzYgidH9swKD7fpCDFAJYP0TDYyUnJ/Ca7bezkVUkRP5qtpRO2c8yc4F5nKBZyqS88ZEgyuymstnJaFbdgGzmR3kvF2SpUrO8AKOnCrTMz5qvWPsraT8/4zliBIpeQ119s8nas9XygobTT1uVdRNIDNNLebrQ6bVBbh1VunKcDjUIex7n0e27oKIycb67zlAhIt1pjsXb8HN6RBO3C3GsPh+LeE3ukle62xyaWBjxKqczhqbfEPd3Cqc9KGyukg/PfCh+Rj";
var _L20="X03wwCA3/kyl9hIc1yla/c0LPZrs246Wly7+tt96Ax27dy/MjWrOM6c5jrDS4r3pTkrhoCItPJZf4Q+e/75LTfU4pRN+Ls7F27oJruUfdA/f2BYKrsS7NgqENTmrcfR0uzC+D85C2w+F/j1uW5ZV5siFh2sD4m6XwRCyI+MKFn3neZe3QYy4a+IvHsjOIgVDvo2szMyraXMpllXoD060Rn1QBddZ/1jaPGKx8YL8uoZrdLnDqD6hkuvrhOiE9ns0Aumu8TBVJ1u47c1pC4e0anHy9FHpmuzQBPhz0D5+V2ZTv6NkURDPDEDRiyUb178/bzndQTrviH6czbaP0LZLzFkriMWp2vFN6Cyv/pZ1kiuK90W2X5Jr6r9hLCl9I4alXE6CnTqLinnoU0Hs2YEHvcBiGqvSlb47s6ggY+C7so5U2QFk6dt/91B//40D/+MkP//F9dAxGDhaCn+WAcJabAAAHLd6DsGw8TRJ4DvsizmZCjlTC27g71RCFKl2rl7xPVeFwkUnF6Nc5BORz5afrX5dkzgjtbYOcpn/rdLvm27UjexN++CEIogOv+GSHCZ/vpUY3Fiy7mHi4X7JBKovNgyJHBo5wgFzKAtRik4k4r+4EZhBiRwMUs0AgIwk1QOKyYCjlTftsow0fHWtdWcCvoewyeAx5jh31TOu+DTd5VGj5e6eGlu5xvuRLangdcwTx0bzEojKP16O2m22qx+NC4WCtCvASr3yATxUgXbcP2nhLNZQ3rdYkxcRQE/sce0b5qS39mDfqn33ceDmN1ixWfx2QAMeTURSCZ/rUjA20azZWfxmZE/+nUKLxXMcYU+MJuHmLhf/ZTuO/ctvFkVUYfvo0yYPtz0oVrCWX9ez7VhRisaSHlFCeYmy8Vj6akLVo67eYBmRqdmMncAxrwgHnVddmUJib61GA8OZ+FT12bjFovMJ/5assD+KJzz84JAO2utatpmwXznLun40R2wtxpLhVStdsAAAEa0AsgdBM8RLQZnXJhb/KCHcL2BWhkEhh64fxvbYgF5FT3UqXm1CDSO87HekbrilHeZJZWC7scAduTRsocMB4ejg5ByUv+V0kcr0qySnBaHmpRiS/bV5EZ5FY/dRXM12UptnDNVZ7SFQ47B9wiq+t8BKTUSpCf7PdXQAtFXtHa6bHT7WQPm9VO4V5uulj2NeKF2o/4nciPotyejaZggAAAA=";
var AIEON_LOGO_B64=_L1+_L2+_L3+_L4+_L5+_L6+_L7+_L8+_L9+_L10+_L11+_L12+_L13+_L14+_L15+_L16+_L17+_L18+_L19+_L20;

// -- Sparks ------------------------------------------------------------
const SPARK_DATA = [
  {l:"8%",  t:"15%", s:2,   bg:"#3b6ef8", dur:"1.8s", del:"0.0s", rot:-25},
  {l:"18%", t:"42%", s:3,   bg:"#3b6ef8", dur:"1.7s", del:"0.4s", rot:-30},
  {l:"28%", t:"22%", s:2,   bg:"#00d4c8", dur:"2.1s", del:"0.3s", rot:15},
  {l:"6%",  t:"65%", s:2,   bg:"#5588ff", dur:"1.9s", del:"0.7s", rot:40},
  {l:"38%", t:"10%", s:3,   bg:"#00f0e0", dur:"2.0s", del:"1.1s", rot:-10},
  {l:"52%", t:"28%", s:3,   bg:"#3b6ef8", dur:"1.9s", del:"0.8s", rot:10},
  {l:"62%", t:"18%", s:2,   bg:"#00d4c8", dur:"2.2s", del:"0.5s", rot:-40},
  {l:"72%", t:"38%", s:3,   bg:"#5588ff", dur:"2.0s", del:"1.0s", rot:25},
  {l:"82%", t:"12%", s:2,   bg:"#00f0e0", dur:"1.7s", del:"0.6s", rot:-20},
  {l:"88%", t:"55%", s:3,   bg:"#3b6ef8", dur:"1.8s", del:"0.9s", rot:30},
  {l:"92%", t:"30%", s:2,   bg:"#00d4c8", dur:"2.3s", del:"1.3s", rot:-35},
  {l:"4%",  t:"35%", s:2,   bg:"#5588ff", dur:"2.0s", del:"0.2s", rot:20},
  {l:"14%", t:"80%", s:2,   bg:"#3b6ef8", dur:"1.6s", del:"1.4s", rot:35},
  {l:"32%", t:"75%", s:2,   bg:"#00d4c8", dur:"1.9s", del:"0.3s", rot:-15},
  {l:"58%", t:"82%", s:2,   bg:"#5588ff", dur:"2.1s", del:"1.0s", rot:40},
  {l:"75%", t:"72%", s:2,   bg:"#00f0e0", dur:"1.8s", del:"0.5s", rot:-30},
  {l:"86%", t:"78%", s:2,   bg:"#3b6ef8", dur:"2.2s", del:"1.2s", rot:15},
  {l:"94%", t:"68%", s:2,   bg:"#00d4c8", dur:"1.7s", del:"0.8s", rot:-25},
  {l:"22%", t:"55%", s:3.5, bg:"#3b6ef8", dur:"1.7s", del:"0.4s", rot:35},
  {l:"45%", t:"65%", s:3.5, bg:"#00d4c8", dur:"1.6s", del:"0.9s", rot:-15},
  {l:"66%", t:"52%", s:3.5, bg:"#5588ff", dur:"1.9s", del:"1.2s", rot:25},
  {l:"78%", t:"22%", s:3.5, bg:"#00f0e0", dur:"1.8s", del:"0.6s", rot:-20},
  {l:"42%", t:"45%", s:5,   bg:"#3b6ef8", dur:"1.5s", del:"0.5s", rot:-10, anchor:true},
  {l:"58%", t:"35%", s:5,   bg:"#00d4c8", dur:"1.5s", del:"0.9s", rot:20,  anchor:true},
  {l:"3%",  t:"45%", s:2,   bg:"#5588ff", dur:"2.0s", del:"1.5s", rot:25},
  {l:"10%", t:"28%", s:2,   bg:"#00d4c8", dur:"1.8s", del:"0.2s", rot:-40},
  {l:"16%", t:"88%", s:2,   bg:"#3b6ef8", dur:"2.1s", del:"1.6s", rot:15},
  {l:"25%", t:"12%", s:2,   bg:"#00f0e0", dur:"1.7s", del:"0.4s", rot:-30},
  {l:"33%", t:"55%", s:2,   bg:"#5588ff", dur:"1.9s", del:"1.8s", rot:40},
  {l:"37%", t:"85%", s:2,   bg:"#3b6ef8", dur:"2.2s", del:"0.1s", rot:-20},
  {l:"44%", t:"25%", s:2,   bg:"#00d4c8", dur:"1.6s", del:"1.3s", rot:30},
  {l:"50%", t:"78%", s:2,   bg:"#5588ff", dur:"2.0s", del:"0.7s", rot:-15},
  {l:"55%", t:"48%", s:2,   bg:"#00f0e0", dur:"1.8s", del:"1.9s", rot:35},
  {l:"63%", t:"88%", s:2,   bg:"#3b6ef8", dur:"1.7s", del:"0.4s", rot:-25},
  {l:"70%", t:"60%", s:2,   bg:"#00d4c8", dur:"2.1s", del:"1.1s", rot:20},
  {l:"74%", t:"80%", s:2,   bg:"#5588ff", dur:"1.9s", del:"0.6s", rot:-35},
  {l:"80%", t:"45%", s:2,   bg:"#00f0e0", dur:"2.0s", del:"1.4s", rot:10},
  {l:"85%", t:"88%", s:2,   bg:"#3b6ef8", dur:"1.6s", del:"0.3s", rot:-20},
  {l:"91%", t:"62%", s:2,   bg:"#00d4c8", dur:"2.2s", del:"1.7s", rot:30},
  {l:"96%", t:"80%", s:2,   bg:"#5588ff", dur:"1.8s", del:"0.8s", rot:-10},
  {l:"20%", t:"68%", s:3,   bg:"#3b6ef8", dur:"1.9s", del:"1.2s", rot:25},
  {l:"30%", t:"40%", s:3,   bg:"#00d4c8", dur:"1.7s", del:"0.5s", rot:-30},
  {l:"53%", t:"15%", s:3,   bg:"#5588ff", dur:"2.0s", del:"1.0s", rot:40},
  {l:"70%", t:"15%", s:3,   bg:"#00f0e0", dur:"1.8s", del:"0.7s", rot:-15},
  {l:"84%", t:"30%", s:3,   bg:"#3b6ef8", dur:"1.6s", del:"1.3s", rot:20},
  {l:"96%", t:"48%", s:3,   bg:"#00d4c8", dur:"2.1s", del:"0.2s", rot:-35},
  {l:"25%", t:"92%", s:4,   bg:"#3b6ef8", dur:"1.5s", del:"0.6s", rot:15, anchor:true},
  {l:"75%", t:"90%", s:4,   bg:"#00d4c8", dur:"1.6s", del:"1.0s", rot:-25, anchor:true},
];

// -- Inline CSS --------------------------------------------------------
function GlobalStyle() {
  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = [
      "@keyframes arcFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} } @keyframes ignitePulse{0%,100%{box-shadow:0 0 0 0 rgba(0,212,200,0.6),0 0 40px rgba(26,86,219,0.4)}50%{box-shadow:0 0 0 20px rgba(0,212,200,0),0 0 80px rgba(26,86,219,0.6)}} @keyframes igniteRing{0%{transform:scale(0.6);opacity:0.8}100%{transform:scale(2.2);opacity:0}} @keyframes igniteIn{0%{opacity:0;transform:translateY(24px) scale(0.96)}100%{opacity:1;transform:translateY(0) scale(1)}} @keyframes igniteSpark{0%{opacity:0;transform:translate(0,0) scale(1)}10%{opacity:1}80%{opacity:0.6}100%{opacity:0;transform:translate(var(--dx),var(--dy)) scale(0.05)}} @keyframes typeIn{from{width:0}to{width:100%}} @keyframes glowBurst{0%{filter:brightness(1) drop-shadow(0 0 8px rgba(0,212,200,0.6))}50%{filter:brightness(1.4) drop-shadow(0 0 40px rgba(0,212,200,1))}100%{filter:brightness(1) drop-shadow(0 0 8px rgba(0,212,200,0.6))}}",
      "@keyframes arcSpark { 0%{opacity:0;transform:translate(0,0) scale(1)} 12%{opacity:1} 65%{opacity:0.8} 100%{opacity:0;transform:translate(20px,-40px) scale(0.08)} }",
      "@keyframes arcRing  { 0%,100%{transform:scale(1);opacity:0.15} 50%{transform:scale(1.06);opacity:0.7} }",
      "@keyframes fadeUp   { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }",
      "@keyframes slideIn  { from{opacity:0;transform:translateX(-16px)} to{opacity:1;transform:translateX(0)} }",
      "@keyframes pulse    { 0%,100%{opacity:0.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.06)} }",
      "@keyframes blink    { 0%,100%{opacity:1} 50%{opacity:0.3} }",
      "* { box-sizing: border-box; margin: 0; padding: 0; }",
      "body { font-family: system-ui,-apple-system,sans-serif; }",
      "html { scroll-behavior: smooth; }",
    ].join(" ");
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);
  return null;
}

// -- Logo mark ---------------------------------------------------------
function LOGO_SVG() { return(<img src={AIEON_LOGO_B64} alt="AieonLabs" style={{width:36,height:36,objectFit:"contain",filter:"drop-shadow(0 0 6px rgba(59,110,248,0.9)) drop-shadow(0 0 12px rgba(0,212,200,0.6))"}}/> ); }

// -- Nav ---------------------------------------------------------------
function Nav({ onCTA }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return(
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:scrolled?"rgba(8,15,43,0.95)":"transparent",backdropFilter:scrolled?"blur(12px)":"none",borderBottom:scrolled?"1px solid rgba(255,255,255,0.06)":"none",padding:"14px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",transition:"all 0.3s"}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        {LOGO_SVG()}
        <div>
          <div style={{fontSize:15,fontWeight:800,color:"#fff",letterSpacing:"-0.3px"}}>AieonFounder</div>
          <div style={{fontSize:10,color:"rgba(255,255,255,0.5)",letterSpacing:"0.5px"}}>by AieonLabs</div>
        </div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:16}}>
        <a href="#how" style={{fontSize:13,color:"rgba(255,255,255,0.55)",textDecoration:"none",fontWeight:500}}>How it works</a>
        <a href="#pricing" style={{fontSize:13,color:"rgba(255,255,255,0.55)",textDecoration:"none",fontWeight:500}}>Pricing</a>
        <button onClick={onCTA} style={{padding:"9px 20px",borderRadius:10,background:"linear-gradient(135deg,#1a56db,#00d4c8)",color:"#fff",border:"none",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Start Free -></button>
      </div>
    </nav>
  );
}

// -- Hero --------------------------------------------------------------
function Hero({ onCTA }) {
  return(
    <section style={{minHeight:"100vh",background:"linear-gradient(160deg,#060d1f,#0d1f4e)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"100px 24px 80px",textAlign:"center",position:"relative",overflow:"hidden"}}>
      {/* -- Constellation lines -- */}
      <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",overflow:"visible"}} xmlns="http://www.w3.org/2000/svg">
        <line x1="8%" y1="15%" x2="18%" y2="42%" stroke="#3b6ef8" strokeWidth="0.5" opacity="0.22"/>
        <line x1="18%" y1="42%" x2="42%" y2="45%" stroke="#00d4c8" strokeWidth="0.5" opacity="0.2"/>
        <line x1="42%" y1="45%" x2="58%" y2="35%" stroke="#3b6ef8" strokeWidth="0.5" opacity="0.22"/>
        <line x1="58%" y1="35%" x2="78%" y2="22%" stroke="#00d4c8" strokeWidth="0.4" opacity="0.18"/>
        <line x1="78%" y1="22%" x2="88%" y2="55%" stroke="#5588ff" strokeWidth="0.4" opacity="0.16"/>
        <line x1="18%" y1="42%" x2="22%" y2="55%" stroke="#00f0e0" strokeWidth="0.4" opacity="0.15"/>
        <line x1="42%" y1="45%" x2="45%" y2="65%" stroke="#3b6ef8" strokeWidth="0.4" opacity="0.15"/>
        <line x1="66%" y1="52%" x2="75%" y2="72%" stroke="#5588ff" strokeWidth="0.4" opacity="0.17"/>
        <line x1="3%" y1="45%" x2="8%" y2="15%" stroke="#5588ff" strokeWidth="0.4" opacity="0.15"/>
        <line x1="25%" y1="12%" x2="28%" y2="22%" stroke="#00d4c8" strokeWidth="0.4" opacity="0.16"/>
        <line x1="53%" y1="15%" x2="58%" y2="35%" stroke="#5588ff" strokeWidth="0.4" opacity="0.15"/>
        <line x1="70%" y1="15%" x2="78%" y2="22%" stroke="#00d4c8" strokeWidth="0.4" opacity="0.16"/>
        <line x1="80%" y1="45%" x2="88%" y2="55%" stroke="#3b6ef8" strokeWidth="0.3" opacity="0.14"/>
        <line x1="45%" y1="65%" x2="33%" y2="55%" stroke="#00f0e0" strokeWidth="0.3" opacity="0.13"/>
        <line x1="22%" y1="55%" x2="45%" y2="65%" stroke="#5588ff" strokeWidth="0.3" opacity="0.13"/>
      </svg>
      {SPARK_DATA.map(function(sp,i){
        return(
          <div key={i} style={{position:"absolute",left:sp.l,top:sp.t,pointerEvents:"none",animation:"arcSpark "+sp.dur+" linear "+sp.del+" infinite",opacity:0}}>
            <div style={{position:"absolute",width:sp.s*3.5,height:sp.s*0.6,background:sp.bg,borderRadius:"50%",opacity:0.75,top:"50%",left:"50%",transform:"translate(-50%,-50%) rotate("+sp.rot+"deg)"}}/>
            <div style={{position:"absolute",width:sp.s,height:sp.s,background:sp.anchor?"#fff":sp.bg,borderRadius:"50%",opacity:sp.anchor?0.95:0.88,top:"50%",left:"50%",transform:"translate(-50%,-50%)",boxShadow:sp.anchor?"0 0 "+(sp.s*2)+"px "+sp.bg:"0 0 "+(sp.s*1.5)+"px "+sp.bg}}/>
          </div>
        );
      })}
      {[240,320,400].map(function(r,i){ return(
        <div key={i} style={{position:"absolute",width:r,height:r,borderRadius:"50%",border:"1px solid rgba(59,130,246,"+(0.18-i*0.05)+")",animation:"arcRing "+(3.8+i*0.9)+"s ease-in-out "+(i*1.4)+"s infinite",pointerEvents:"none"}}/>
      ); })}

      <div style={{animation:"arcFloat 4.5s ease-in-out infinite",marginBottom:36,position:"relative",zIndex:2}}>
        <div style={{position:"relative",display:"inline-block"}}>
          <div style={{position:"absolute",inset:-28,borderRadius:"50%",background:"radial-gradient(circle,rgba(59,110,248,0.4) 0%,rgba(0,212,200,0.2) 45%,transparent 70%)",filter:"blur(16px)",animation:"pulse 3s ease-in-out infinite"}}/>
          <img src={AIEON_LOGO_B64} alt="AieonLabs" style={{width:140,height:140,objectFit:"contain",position:"relative",zIndex:1,filter:"drop-shadow(0 0 16px rgba(59,110,248,0.95)) drop-shadow(0 0 32px rgba(0,212,200,0.7)) drop-shadow(0 0 56px rgba(59,110,248,0.45))"}}/>
        </div>
      </div>

      <div style={{position:"relative",zIndex:2,maxWidth:760,animation:"fadeUp 0.8s ease"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(0,212,200,0.08)",border:"1px solid rgba(0,212,200,0.18)",borderRadius:20,padding:"6px 16px",marginBottom:28}}>
          <div style={{width:6,height:6,borderRadius:"50%",background:"#00d4c8",boxShadow:"0 0 8px #00d4c8"}}/>
          <span style={{fontSize:11,color:"rgba(0,212,200,0.9)",letterSpacing:3,textTransform:"uppercase",fontFamily:"monospace"}}>Founder Intelligence Platform</span>
        </div>
        <h1 style={{fontSize:"clamp(40px,7vw,80px)",fontWeight:900,color:"#fff",lineHeight:1.0,letterSpacing:"-2.5px",marginBottom:24}}>
          The business you<br/>were built for.<br/><span style={{background:"linear-gradient(90deg,#3b6ef8,#00d4c8)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Start now.</span>
        </h1>
        <p style={{fontSize:"clamp(15px,2vw,18px)",color:"rgba(255,255,255,0.5)",maxWidth:500,margin:"0 auto 40px",lineHeight:1.8}}>
          The right business for the right founder. AI-matched to your personality, stress-tested by your board, built alongside a community that's doing it with you.
        </p>
        <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",marginBottom:24}}>
          <button onClick={onCTA} style={{padding:"17px 40px",borderRadius:12,background:"linear-gradient(135deg,#1a56db,#3b6ef8)",color:"#fff",border:"none",fontSize:16,fontWeight:800,cursor:"pointer",fontFamily:"inherit",boxShadow:"0 8px 40px rgba(26,86,219,0.55)",letterSpacing:"-0.3px"}}>
            Start Free -- No Account Required
          </button>
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:20,flexWrap:"wrap"}}>
          {["Free forever","Takes Under 10 minutes","5 AI advisors","No card required"].map(function(t,i){ return(
            <div key={i} style={{display:"flex",alignItems:"center",gap:6,fontSize:12,color:"rgba(255,255,255,0.45)"}}>
              <span style={{color:"#00d4c8",fontSize:10}}>*</span>{t}
            </div>
          ); })}
        </div>
      </div>
    </section>
  );
}

// -- What makes you different ------------------------------------------
function Pillars() {
  const pillars = [
    {
      icon:"[dna]",
      title:"Built around you. Not a template.",
      body:"Most business tools give you a checklist. AieonFounder builds a profile from 250+ questions -- your capital, your location, your cultural background, your available hours, your risk tolerance. Every idea it generates is forensically matched to who you actually are.",
    },
    {
      icon:"[suit]",
      title:"A board that doesn't pull punches.",
      body:"Five AI advisors -- CFO, CMO, Legal Counsel, Skeptical VC, and a Devil's Advocate -- each assess your idea independently. They disagree with each other. They identify the thing you haven't thought of. That's not a bug. That's the point.",
    },
    {
      icon:"[pin]",
      title:"Hyper-local. Not generic.",
      body:"Your market intelligence is specific to your city, your neighborhood, your capital tier. AieonFounder maps wealth concentrations, trust gaps, and underserved communities in your area -- because the best idea for someone in Austin, Texas is not the best idea for someone in North Jersey.",
    },
    {
      icon:"Z",
      title:"From idea to roadmap in one session.",
      body:"By the time you're done, you have a survival score, a critical 30-day action, a competitive blindspot report, and a full progression map. Not a list of things to think about -- a plan you can start tomorrow.",
    },
  ];
  return(
    <section style={{background:"#fff",padding:"100px 24px"}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:64}}>
          <div style={{fontSize:11,color:CN.blue,letterSpacing:3,textTransform:"uppercase",fontFamily:"monospace",marginBottom:12}}>Why It Works</div>
          <h2 style={{fontSize:"clamp(28px,4vw,44px)",fontWeight:900,color:CN.text,letterSpacing:"-0.5px"}}>Designed for founders who are serious.</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:24}}>
          {pillars.map(function(p,i){ return(
            <div key={i} style={{background:CN.offWhite,borderRadius:20,padding:"28px 24px",border:"1px solid "+CN.border,animation:"fadeUp 0.6s ease "+(i*0.1)+"s both"}}>
              <div style={{fontSize:32,marginBottom:16}}>{p.icon}</div>
              <h3 style={{fontSize:17,fontWeight:800,color:CN.text,marginBottom:10,lineHeight:1.3}}>{p.title}</h3>
              <p style={{fontSize:14,color:CN.muted,lineHeight:1.75}}>{p.body}</p>
            </div>
          ); })}
        </div>
      </div>
    </section>
  );
}

// -- How it works ------------------------------------------------------
function HowItWorks({ onCTA }) {
  const steps = [
    {num:"01",title:"Take the Founder DNA Quiz",body:"20 questions drawn from a pool of 250. Every session is different. 12 MBTI calibration questions from a pool of 60. Your profile is built around how you actually think, not a generic persona.",icon:"[dna]"},
    {num:"02",title:"Get your ScoreCard",body:"A radar chart scoring your Risk Appetite, Execution Speed, Capital Efficiency, Market Intuition, Vision Strength, and People Orientation. Your baseline as a founder -- before you've spent a dollar.",icon:"[chart]"},
    {num:"03",title:"Enter the Idea Crucible",body:"5 AI-generated business ideas forensically matched to your exact profile. Add your own. React to each. The ones you're most excited about go to your Board.",icon:"[fire]"},
    {num:"04",title:"Meet your Board of 5",body:"Lock one idea and five advisors go to work. CFO, CMO, Legal Counsel, Skeptical VC, and a Devil's Advocate -- each assessing your idea from their angle, in sequence.",icon:"[suit]"},
    {num:"05",title:"Get your results",body:"A survival score, a critical 30-day action, your competitive blindspots, and a full Founder Arc progression map. Everything you need to move -- today.",icon:"Z"},
  ];
  return(
    <section id="how" style={{background:"linear-gradient(180deg,#f8faff,#fff)",padding:"100px 24px"}}>
      <div style={{maxWidth:800,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:64}}>
          <div style={{fontSize:11,color:CN.blue,letterSpacing:3,textTransform:"uppercase",fontFamily:"monospace",marginBottom:12}}>The Process</div>
          <h2 style={{fontSize:"clamp(28px,4vw,44px)",fontWeight:900,color:CN.text,letterSpacing:"-0.5px"}}>Five steps. One session. Real answers.</h2>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:0}}>
          {steps.map(function(s,i){ return(
            <div key={i} style={{display:"flex",gap:24,paddingBottom:i<steps.length-1?40:0,marginBottom:i<steps.length-1?40:0,borderBottom:i<steps.length-1?"1px solid "+CN.border:"none"}}>
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:0,flexShrink:0}}>
                <div style={{width:48,height:48,borderRadius:14,background:"linear-gradient(135deg,"+CN.navy+","+CN.blue+")",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{s.icon}</div>
                {i<steps.length-1&&<div style={{width:2,flex:1,background:"linear-gradient(180deg,"+CN.blue+"44,transparent)",marginTop:8}}/>}
              </div>
              <div style={{paddingTop:8}}>
                <div style={{fontSize:11,color:CN.blue,fontFamily:"monospace",fontWeight:700,marginBottom:4,letterSpacing:1}}>Step {s.num}</div>
                <h3 style={{fontSize:18,fontWeight:800,color:CN.text,marginBottom:8}}>{s.title}</h3>
                <p style={{fontSize:14,color:CN.muted,lineHeight:1.75}}>{s.body}</p>
              </div>
            </div>
          ); })}
        </div>
        <div style={{textAlign:"center",marginTop:56}}>
          <button onClick={onCTA} style={{padding:"15px 40px",borderRadius:14,background:"linear-gradient(135deg,"+CN.navy+","+CN.blue+")",color:"#fff",border:"none",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:"inherit",boxShadow:"0 6px 24px rgba(26,86,219,0.35)"}}>
            Start Your Session ->
          </button>
          <div style={{marginTop:12,fontSize:12,color:CN.muted}}>Free * No account * Under 10 minutes</div>
        </div>
      </div>
    </section>
  );
}

// -- Advisors ----------------------------------------------------------
function Advisors() {
  const board = [
    {emoji:"[chart]",title:"The CFO",focus:"Unit economics, burn rate & financial survival",color:"#1a56db",body:"Knows exactly how long your runway lasts and what you need to do this week to extend it. No optimism -- just math."},
    {emoji:"[mega]",title:"The CMO",focus:"Go-to-market, positioning & customer acquisition",color:"#0891b2",body:"Names your first paying customer, where to find them, and exactly what to say. Not a strategy -- a conversation."},
    {emoji:"=",title:"Legal Counsel",focus:"Legal risk, IP, jurisdiction & compliance",color:"#7c3aed",body:"The one legal step you can't skip before your first client. The structure that protects you without slowing you down."},
    {emoji:"[brief]",title:"Skeptical VC",focus:"Fundability, market size & investor red flags",color:"#d97706",body:"Is there a real market? Is this fundable? What does a real investor see when they look at this? Honest answers only."},
    {emoji:"[devil]",title:"Devil's Advocate",focus:"Existential threats & reasons this shouldn't exist",color:"#dc2626",body:"The advisor who makes the strongest case against your idea. The one you need to hear the most. The one most tools skip."},
  ];
  return(
    <section style={{background:CN.text,padding:"100px 24px"}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:64}}>
          <div style={{fontSize:11,color:"#3b6ef8",letterSpacing:3,textTransform:"uppercase",fontFamily:"monospace",marginBottom:12}}>Your Board</div>
          <h2 style={{fontSize:"clamp(28px,4vw,44px)",fontWeight:900,color:"#fff",letterSpacing:"-0.5px",marginBottom:12}}>Five advisors. Five angles. One truth.</h2>
          <p style={{fontSize:16,color:"rgba(255,255,255,0.5)",maxWidth:500,margin:"0 auto",lineHeight:1.7}}>They don't coordinate. They don't soften their answers. They assess your idea from their discipline -- and you get the full picture.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:20}}>
          {board.map(function(a,i){ return(
            <div key={i} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:18,padding:"24px 22px",borderTop:"3px solid "+a.color}}>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
                <div style={{width:44,height:44,borderRadius:12,background:a.color+"22",border:"1.5px solid "+a.color+"44",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{a.emoji}</div>
                <div>
                  <div style={{fontWeight:700,color:"#fff",fontSize:15}}>{a.title}</div>
                  <div style={{fontSize:11,color:"rgba(255,255,255,0.5)",marginTop:2}}>{a.focus}</div>
                </div>
              </div>
              <p style={{fontSize:13,color:"rgba(255,255,255,0.55)",lineHeight:1.7}}>{a.body}</p>
            </div>
          ); })}
        </div>
      </div>
    </section>
  );
}

// -- Stats bar ---------------------------------------------------------
function Stats() {
  const stats = [
    {num:"250+",label:"Questions in the pool"},
    {num:"60",label:"MBTI questions"},
    {num:"5",label:"AI advisors per session"},
    {num:"25",label:"Founder Arc milestones"},
    {num:"$0",label:"To get started"},
  ];
  return(
    <section style={{background:"#060d1f",borderTop:"1px solid rgba(255,255,255,0.04)",borderBottom:"1px solid rgba(255,255,255,0.04)",padding:"56px 24px"}}>
      <div style={{maxWidth:900,margin:"0 auto",display:"flex",flexWrap:"wrap",justifyContent:"center",alignItems:"center",gap:0}}>
        {stats.map(function(s,i){ return(
          <div key={i} style={{width:168,padding:"0 14px",textAlign:"center",borderRight:i<stats.length-1?"1px solid rgba(255,255,255,0.06)":"none",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            <div style={{fontSize:"clamp(36px,5vw,54px)",fontWeight:900,color:"#fff",letterSpacing:"-2px",lineHeight:1}}>{s.num}</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.4)",marginTop:10,letterSpacing:"1.5px",textTransform:"uppercase"}}>{s.label}</div>
          </div>
        ); })}
      </div>
    </section>
  );
}

// -- Pricing preview ---------------------------------------------------
function PricingPreview({ onCTA }) {
  return(
    <section id="pricing" style={{background:CN.offWhite,padding:"100px 24px"}}>
      <div style={{maxWidth:860,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:56}}>
          <div style={{fontSize:11,color:CN.blue,letterSpacing:3,textTransform:"uppercase",fontFamily:"monospace",marginBottom:12}}>Pricing</div>
          <h2 style={{fontSize:"clamp(28px,4vw,44px)",fontWeight:900,color:CN.text,letterSpacing:"-0.5px"}}>Start free. Upgrade when you're ready.</h2>
        </div>
        <div style={{display:"flex",gap:24,flexWrap:"wrap",justifyContent:"center"}}>
          {/* Free */}
          <div style={{background:"#fff",borderRadius:20,border:"1.5px solid "+CN.border,padding:"32px 28px",flex:1,minWidth:280,maxWidth:380}}>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:3,textTransform:"uppercase",color:CN.blue,marginBottom:10}}>Free</div>
            <div style={{fontSize:48,fontWeight:900,color:CN.text,lineHeight:1,marginBottom:8}}>$0</div>
            <div style={{fontSize:13,color:CN.muted,marginBottom:24,lineHeight:1.6}}>Everything you need to find your idea and stress-test it. No card. No expiry.</div>
            <button onClick={onCTA} style={{width:"100%",padding:"13px",borderRadius:11,background:CN.navy,color:"#fff",border:"none",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"inherit",marginBottom:24}}>Start Free -></button>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {[
                {icon:"[dna]",label:"Founder DNA Quiz"},
                {icon:"[brain]",label:"MBTI Founder Type"},
                {icon:"[chart]",label:"Founder ScoreCard"},
                {icon:"[fire]",label:"Idea Crucible -- 5 matched ideas"},
                {icon:"[suit]",label:"Board of 5 AI Advisors"},
                {icon:"[lab]",label:"Idea Exploration & Refinement"},
                {icon:"Z",label:"Founder Arc preview"},
              ].map(function(f,i){ return(
                <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 10px",borderRadius:10,background:"#f8faff"}}>
                  <div style={{width:32,height:32,borderRadius:9,background:"linear-gradient(135deg,#eff6ff,#dbeafe)",border:"1px solid #bfdbfe",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{f.icon}</div>
                  <span style={{fontSize:13,fontWeight:600,color:"#1e293b"}}>{f.label}</span>
                </div>
              ); })}
            </div>
          </div>
          {/* Ignite */}
          <div style={{background:"linear-gradient(155deg,#080f2b,#0d1f4e)",borderRadius:20,border:"1px solid rgba(59,130,246,0.4)",padding:"32px 28px",flex:1,minWidth:280,maxWidth:380,position:"relative",boxShadow:"0 24px 80px rgba(26,86,219,0.3)"}}>
            
            <div style={{fontSize:11,fontWeight:700,letterSpacing:3,textTransform:"uppercase",color:"#3b6ef8",marginBottom:10}}>Ignite</div>
            <div style={{display:"flex",alignItems:"flex-end",gap:6,marginBottom:4}}>
              <div style={{fontSize:48,fontWeight:900,color:"#fff",lineHeight:1}}>$39</div>
              <div style={{fontSize:14,color:"rgba(255,255,255,0.4)",marginBottom:8}}>/month</div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}>
              <span style={{fontSize:12,color:"#3b6ef8",fontWeight:600}}>or $249/year</span>
              <span style={{fontSize:11,background:"#059669",color:"#fff",borderRadius:20,padding:"2px 10px",fontWeight:700}}>Save 47%</span>
            </div>
            <div style={{background:"rgba(0,212,200,0.08)",border:"1px solid rgba(0,212,200,0.2)",borderRadius:10,padding:"10px 14px",marginBottom:20}}>
              <div style={{fontSize:12,color:"#00d4c8",fontWeight:700,marginBottom:2}}>[unlock] Unlocks the full AieonFounder experience</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.45)",lineHeight:1.5}}>The tools that separate founders who think from founders who build. Cancel anytime.</div>
            </div>
            <button onClick={onCTA} style={{width:"100%",padding:"13px",borderRadius:11,background:"linear-gradient(135deg,#1a56db,#3b82f6)",color:"#fff",border:"none",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"inherit",marginBottom:24,boxShadow:"0 6px 24px rgba(59,130,246,0.4)"}}>Upgrade to Ignite -></button>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                <div style={{fontSize:11,color:"rgba(255,255,255,0.45)",letterSpacing:1,textTransform:"uppercase",marginBottom:4}}>Everything in Free, plus:</div>
                {[
                  {icon:"[chat]",label:"Board Debate",desc:"Push back on any advisor. They respond in character."},
                  {icon:"[map]",label:"30-Day Action Roadmap",desc:"Week-by-week launch plan, auto-generated."},
                  {icon:"[search]",label:"Competitive Blindspot Report",desc:"3 gaps your competitors missed. How to exploit them."},
                  {icon:"Z",label:"Full Founder Arc",desc:"25 milestones. AI guidance at every step. Badges."},
                  {icon:"[cal]",label:"Daily Founder Brief",desc:"One action, one market signal, one MBTI mindset note. Every morning."},
                  {icon:"[mail]",label:"Weekly Founder Pulse",desc:"Your board checks in every Monday with one accountability question."},
                  {icon:"[target]",label:"Daily Quote -- 7 Voices",desc:"CFO, CMO, Legal, VC, Devil's Advocate, Arc, and your MBTI type. Every day."},
                  {icon:"*",label:"XP & Level System",desc:"Earn XP for every action. 10 founder levels from Founder in Waiting to Arc Master."},
                  {icon:"[medal]",label:"Badge Collection",desc:"13 earnable badges across 5 rarity tiers. Yours to keep permanently."},
                  {icon:"[gift]",label:"Rewards & Recognition",desc:"Earn Ignite credits, founder spotlights, and lifetime access as you hit milestones. Complete the Arc and Ignite is yours for life."},
                  {icon:"[globe]",label:"Daily Pulse Community",desc:"One anonymous prompt per day shared with every Ignite member. See what other founders are thinking."},
                  {icon:"[inbox]",label:"Review Drop Box",desc:"Drop in your idea, pitch, or copy. AI board reviews instantly. 3 human reviews/month included."},
                  {icon:"[up]",label:"Monthly Board Check-In",desc:"Return with real data. Your board updates its full assessment."},
                  {icon:"[seed]",label:"Early Access Intelligence",desc:"Grants, accelerators, and competitions matched to you."},
                  {icon:"[lab]",label:"Early Feature Access",desc:"Every new tool ships to Ignite members first."},
                ].map(function(f,i){ return(
                  <div key={i} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"8px 10px",background:"rgba(255,255,255,0.04)",borderRadius:10,border:"1px solid rgba(255,255,255,0.06)"}}>
                    <span style={{fontSize:15,flexShrink:0,marginTop:1}}>{f.icon}</span>
                    <div>
                      <div style={{fontSize:13,fontWeight:700,color:"rgba(255,255,255,0.85)",lineHeight:1.3}}>{f.label}</div>
                      <div style={{fontSize:11,color:"rgba(255,255,255,0.4)",marginTop:2,lineHeight:1.4}}>{f.desc}</div>
                    </div>
                  </div>
                ); })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// -- Final CTA ---------------------------------------------------------
function FinalCTA({ onCTA }) {
  return(
    <section style={{background:"linear-gradient(160deg,#060d1f,#0d1f4e)",padding:"120px 24px",textAlign:"center",position:"relative",overflow:"hidden"}}>
      {SPARK_DATA.slice(0,16).map(function(sp,i){
        return(
          <div key={i} style={{position:"absolute",left:sp.l,top:sp.t,pointerEvents:"none",animation:"arcSpark "+sp.dur+" linear "+sp.del+" infinite",opacity:0}}>
            <div style={{position:"absolute",width:sp.s*3.5,height:sp.s*0.6,background:sp.bg,borderRadius:"50%",opacity:0.7,top:"50%",left:"50%",transform:"translate(-50%,-50%) rotate("+sp.rot+"deg)"}}/>
            <div style={{position:"absolute",width:sp.s,height:sp.s,background:sp.anchor?"#fff":sp.bg,borderRadius:"50%",opacity:0.88,top:"50%",left:"50%",transform:"translate(-50%,-50%)",boxShadow:"0 0 "+(sp.s*1.5)+"px "+sp.bg}}/>
          </div>
        );
      })}
      <div style={{position:"relative",zIndex:2}}>
        <div style={{fontSize:11,color:"#3b6ef8",letterSpacing:4,textTransform:"uppercase",fontFamily:"monospace",marginBottom:16}}>Ready?</div>
        <h2 style={{fontSize:"clamp(32px,5vw,60px)",fontWeight:900,color:"#fff",marginBottom:16,letterSpacing:"-1px",lineHeight:1.1}}>
          Find the business<br/>you were built for.
        </h2>
        <p style={{fontSize:18,color:"rgba(255,255,255,0.5)",marginBottom:40,maxWidth:480,margin:"0 auto 40px",lineHeight:1.7}}>
          Free to start. No credit card. No account. Just your answers -- and a board that tells you the truth.
        </p>
        <button onClick={onCTA} style={{padding:"18px 52px",borderRadius:16,background:"linear-gradient(135deg,#1a56db,#00d4c8)",color:"#fff",border:"none",fontSize:18,fontWeight:800,cursor:"pointer",fontFamily:"inherit",boxShadow:"0 10px 40px rgba(26,86,219,0.5)"}}>
          Start Free ->
        </button>
        <div style={{marginTop:16,display:"flex",alignItems:"center",justifyContent:"center",gap:20,flexWrap:"wrap"}}>
          {["Free forever","Under 10 minutes","No account required"].map(function(t,i){ return(
            <div key={i} style={{fontSize:13,color:"rgba(255,255,255,0.45)",display:"flex",alignItems:"center",gap:5}}>
              <span style={{color:"#00d4c8"}}>v</span>{t}
            </div>
          ); })}
        </div>
      </div>
    </section>
  );
}

// -- Footer ------------------------------------------------------------
function Footer() {
  return(
    <footer style={{background:"#060d1f",padding:"40px 24px",borderTop:"1px solid rgba(255,255,255,0.06)"}}>
      <div style={{maxWidth:1100,margin:"0 auto",display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between",gap:16}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          {LOGO_SVG()}
          <div>
            <div style={{fontSize:14,fontWeight:700,color:"rgba(255,255,255,0.7)"}}>AieonFounder</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.4)"}}>by AieonLabs</div>
          </div>
        </div>
        <div style={{fontSize:12,color:"rgba(255,255,255,0.5)",lineHeight:1.6,maxWidth:420,textAlign:"right"}}>
          AI-generated content for informational purposes only. Not legal, financial, or professional advice. AieonFounder is currently optimized for US-based founders.
        </div>
      </div>
    </footer>
  );
}

// -- Main --------------------------------------------------------------
function LandingPage({onNavigate}) {
  var handleCTA = function() {
    if(onNavigate) onNavigate("app");
    else if(window.__aieonNavigate) window.__aieonNavigate("app");
  };

  return(
    <div style={{fontFamily:"system-ui,-apple-system,sans-serif"}}>
      <GlobalStyle/>
      <Nav onCTA={handleCTA}/>
      <Hero onCTA={handleCTA}/>
      <Stats/>
      <Pillars/>
      <HowItWorks onCTA={handleCTA}/>
      <Advisors/>
      <PricingPreview onCTA={handleCTA}/>
      <FinalCTA onCTA={handleCTA}/>
      <Footer/>

        {/* AI Disclaimer */}
        <div style={{maxWidth:680,margin:"0 auto",padding:"0 20px 40px"}}>
          <div style={{padding:"14px 18px",background:"#f8faff",borderRadius:12,border:"1px solid #e2e8f0",fontSize:11,color:"#64748b",lineHeight:1.75}}>
            <strong style={{color:"#0f172a"}}>! AI Disclaimer:</strong> All content generated by AieonFounder -- including ideas, board assessments, roadmaps, scorecards, quotes, and recommendations -- is produced by artificial intelligence for informational and educational purposes only. AI-generated content may contain errors, omissions, or hallucinations (plausible-sounding but factually incorrect information). Nothing on this platform constitutes legal, financial, business, or professional advice. Always consult a qualified professional before making significant decisions. AieonLabs makes no guarantees about business outcomes resulting from use of this platform.
          </div>
        </div>
    </div>
  );
}

// ----------------------------------------------------------------
// MAIN APP
// ----------------------------------------------------------------
const CL = { navy:"#0d1f4e",navyDark:"#080f2b",navyMid:"#152663",blue:"#1a56db",blueBright:"#3b82f6",blueLight:"#dbeafe",bluePale:"#eff6ff",white:"#ffffff",offWhite:"#f8faff",text:"#0f172a",textMid:"#334155",muted:"#64748b",border:"#e2e8f0",borderBlue:"#bfdbfe",success:"#059669",danger:"#dc2626" };
const DISCLAIMER_SHORT = "! AI guidance only -- not legal or financial advice. Always verify with licensed professionals.";
const DISCLAIMER_FULL = [
  "AieonFounder provides AI-generated content for educational and informational purposes only.",
  "This platform is NOT a substitute for legal, financial, tax, accounting, or professional business advice. Nothing generated by AieonFounder constitutes legal counsel, financial planning, tax guidance, or any other regulated professional service.",
  "AI systems can and do make errors, omissions, and hallucinations. All content -- including advisor responses, business ideas, milestone guidance, Arc Guide consultations, roadmaps, blindspot reports, and community content -- should be independently verified before you act on it.",
  "The Founder Arc and Arc Guide are educational tools only. Decisions about business formation, entity structure, contracts, insurance, hiring, or financial strategy should be made in consultation with licensed professionals in your jurisdiction.",
  "Daily Pulse responses are anonymous community contributions and do not represent professional advice. Review Drop Box feedback is AI-generated and should not replace professional review.",
  "AieonFounder and AieonLabs LLC make no guarantees about business outcomes, revenue, or results. Past founder outcomes featured on the platform are individual results and not representative of typical experience.",
  "By proceeding, you confirm that you have read, understood, and agree to these terms.",
].join(" ");
const CAPITAL_OPTIONS = ["Under $1,000","$1,000-$5,000","$5,000-$25,000","$25,000-$100,000","$100,000+"];

const ADVISORS = [
  {id:"cfo",  emoji:"[chart]",title:"The CFO",          color:"#1a56db",focus:"unit economics, burn rate & financial survival",         voiceId:"pNInz6obpgDQGcFmaJgB",voiceName:"Adam"},
  {id:"cmo",  emoji:"[mega]",title:"The CMO",          color:"#0891b2",focus:"go-to-market, positioning & customer acquisition",        voiceId:"21m00Tcm4TlvDq8ikWAM",voiceName:"Rachel"},
  {id:"legal",emoji:"=",title:"Legal Counsel",    color:"#7c3aed",focus:"legal risk, IP, jurisdiction & compliance",               voiceId:"ErXwobaYiN019PkySvjV",voiceName:"Antoni"},
  {id:"vc",   emoji:"[brief]",title:"Skeptical VC",     color:"#0d9488",focus:"fundability, market size & investor red flags",           voiceId:"MF3mGyEYCl7XYWbV9V9R",voiceName:"Elli"},
  {id:"devil",emoji:"[devil]",title:"Devil's Advocate", color:"#dc2626",focus:"existential threats & reasons this shouldn't exist",      voiceId:"TxGEqnHWrfWFTfGW9XjX",voiceName:"Josh"},
];

const MBTI_TYPES = {
  ENTJ:{name:"The Commander",   tag:"You build systems that scale.",             desc:"Decisive, strategic, built for leadership. You see the full picture and move fast. You want to build something that runs without you.",          fit:["B2B SaaS or enterprise software","Management consulting for large clients","Executive coaching practice","Private equity or investment holding","Staffing and talent solutions firm"]},
  ENTP:{name:"The Innovator",   tag:"You see what others haven't built yet.",    desc:"You thrive on ideas, debates, disruption. Allergic to boring. The business that fits you probably doesn't exist yet.",                         fit:["AI product or automation startup","Contrarian media brand","Innovation consulting for legacy industries","Licensing or IP-based business","Patent-backed product company"]},
  ENFJ:{name:"The Mentor",      tag:"You build people, not just products.",      desc:"Your superpower is seeing potential in others before they see it. Coaching, education, and community are your terrain.",                         fit:["Corporate training and leadership development","Online education with live cohorts","DEI and culture consultancy","Career transition coaching practice","Talent development agency"]},
  ENFP:{name:"The Champion",    tag:"You inspire people to believe.",            desc:"Creative, charismatic, values-driven. You build movements. Most powerful when work aligns with something you genuinely believe in.",               fit:["Purpose-driven brand or creative studio","Social impact consulting","Podcast network or media production","Wellness brand with genuine community","Event production company"]},
  INTJ:{name:"The Architect",   tag:"You solve problems others haven't noticed.",desc:"Strategic, independent, intellectually precise. You see systems and patterns others miss entirely.",                                              fit:["Deep tech or niche software product","Research-backed advisory firm","Boutique strategy consulting","Automated investment or data product","IP or licensing business"]},
  INTP:{name:"The Thinker",     tag:"You build frameworks others live inside.",  desc:"Analytical, inventive, endlessly curious. The best businesses for you are ones where intellectual depth is the product.",                        fit:["Developer tools or infrastructure","Quantitative research or analytics firm","Technical education platform","Open-source with paid enterprise tier","Specialized technical consulting"]},
  INFJ:{name:"The Visionary",   tag:"You build for the world you want to see.", desc:"Rare, private, deeply purposeful. When you find the right mission, you're unstoppable.",                                                          fit:["Mental health or wellness practice","Values-based investment or ESG advisory","Regenerative or sustainability consultancy","Niche personal development brand","Advocacy-adjacent consulting"]},
  INFP:{name:"The Idealist",    tag:"You build things that matter, not just sell.",desc:"Values-first, deeply creative. You need your work to mean something real.",                                                                     fit:["Freelance creative studio","Values-aligned coaching or counseling","Independent publishing or literary agency","Artisan product brand with ethical story","UX design or accessibility consulting"]},
  ESTJ:{name:"The Director",    tag:"You make things run.",                      desc:"Reliable, organized, results-focused. You scale things with systems and discipline.",                                                              fit:["Operations or process improvement consultancy","Commercial real estate management","Franchise acquisition and operations","Regional logistics or distribution","Compliance or regulatory advisory"]},
  ESFJ:{name:"The Provider",    tag:"You build businesses that take care of people.",desc:"Warm, organized, community-focused. Built on relationships and repeat customers who feel genuinely valued.",                                  fit:["Senior care or home health agency","Wedding and events planning","Family law or estate planning firm","Premium childcare or early education","Customer experience consulting"]},
  ESTP:{name:"The Entrepreneur",tag:"You build fast and adapt faster.",          desc:"Action-oriented, fearless. You need a starting point and enough energy to outlast every obstacle.",                                               fit:["Commercial real estate brokerage","High-ticket sales training firm","Import/export or product arbitrage","Staffing agency for skilled trades","Sports performance or athleisure brand"]},
  ESFP:{name:"The Performer",   tag:"You build experiences people remember.",    desc:"Spontaneous, magnetic, energetic. Built on personality and the feeling you generate in every interaction.",                                       fit:["Boutique hotel or hospitality brand","Experiential marketing agency","Influencer brand management","Live entertainment production","Beauty, fashion, or lifestyle brand"]},
  ISTJ:{name:"The Inspector",   tag:"You build things that last.",               desc:"Disciplined, trustworthy, detail-oriented. You build things that work reliably over time.",                                                        fit:["Accounting, tax, or forensic accounting practice","Title company or real estate closing","Insurance agency -- commercial or specialty","IT managed services for SMBs","Engineering or inspection services"]},
  ISFJ:{name:"The Protector",   tag:"You build safety and trust.",               desc:"Caring, dependable, quietly excellent. Your depth of care IS the product.",                                                                        fit:["Occupational or physical therapy practice","Medical billing or healthcare administration","Nonprofit management consulting","Pet care or veterinary services","Special education or learning support center"]},
  ISTP:{name:"The Craftsman",   tag:"You build things that work, beautifully.",  desc:"Hands-on, analytical, quietly masterful. You'd rather solve a real problem than talk about solving it.",                                          fit:["Precision manufacturing or custom fabrication","Cybersecurity or penetration testing","Aviation maintenance or specialty vehicle service","Custom software for industrial clients","Renewable energy installation"]},
  ISFP:{name:"The Artist",      tag:"You build beauty into everything you make.",desc:"Gentle, creative, deeply authentic. Your aesthetic and values are the entire point.",                                                              fit:["Interior design or residential architecture studio","Fine dining, specialty food, or catering","Independent film or documentary production","Fragrance, cosmetics, or personal care brand","Sustainable fashion or textile design"]},
};

// -- 60 MBTI questions -------------------------------------------------
const MBTI_POOL = {
EI:[
  {id:"ei1", l:"After a full day of back-to-back team meetings, you feel...",        o:[{t:"Energized -- I get more done around people",s:"E"},{t:"Drained -- I need time alone to recover",s:"I"},{t:"Neutral -- depends on who was in the room",s:"I"},{t:"Fired up -- momentum is everything",s:"E"}]},
  {id:"ei2", l:"Your ideal customer relationship is...",                             o:[{t:"Frequent touchpoints and real connection",s:"E"},{t:"Async, efficient, minimal back-and-forth",s:"I"},{t:"Deep bonds with a small handful of clients",s:"I"},{t:"Transactional and scalable at high volume",s:"E"}]},
  {id:"ei3", l:"When processing a hard business problem, you...",                    o:[{t:"Talk it out -- external thinking helps most",s:"E"},{t:"Go quiet and think it through alone first",s:"I"},{t:"Write it all out privately before discussing",s:"I"},{t:"Jump into action and learn from what breaks",s:"E"}]},
  {id:"ei4", l:"The marketing channel that feels most natural is...",                o:[{t:"Speaking, video, events -- being in front of people",s:"E"},{t:"Writing, SEO, content people find on their own",s:"I"},{t:"Slow referral and word-of-mouth relationships",s:"I"},{t:"Paid campaigns and high-visibility presence",s:"E"}]},
  {id:"ei5", l:"After a major win at work, you want to...",                          o:[{t:"Celebrate with the team immediately",s:"E"},{t:"Sit with it quietly before sharing",s:"I"},{t:"Move straight to the next challenge",s:"E"},{t:"Reflect privately on what made it work",s:"I"}]},
  {id:"ei6", l:"In a new professional setting, you tend to...",                      o:[{t:"Introduce yourself and start conversations",s:"E"},{t:"Wait for a natural opening to join",s:"I"},{t:"Find one interesting person and go deep",s:"I"},{t:"Work the room and enjoy meeting everyone",s:"E"}]},
  {id:"ei7", l:"When overwhelmed, your instinct is to...",                           o:[{t:"Call someone -- talking it through helps",s:"E"},{t:"Disappear for a while to reset alone",s:"I"},{t:"Journal or write until it becomes clear",s:"I"},{t:"Get busy -- momentum cures most problems",s:"E"}]},
  {id:"ei8", l:"Your ideal office setup is...",                                      o:[{t:"Open, collaborative, people around all day",s:"E"},{t:"Home office, door closed, deep focus",s:"I"},{t:"Collaborative mornings, quiet afternoons",s:"I"},{t:"A bustling co-working space with energy",s:"E"}]},
  {id:"ei9", l:"You generate your best ideas...",                                    o:[{t:"In conversation with smart people",s:"E"},{t:"Alone, walking, showering, or journaling",s:"I"},{t:"Reading and researching privately",s:"I"},{t:"In group brainstorming sessions",s:"E"}]},
  {id:"ei10",l:"When a client needs an urgent decision, you...",                     o:[{t:"Get on a call immediately -- let's solve it now",s:"E"},{t:"Prefer to think before responding, even briefly",s:"I"},{t:"Send a thorough written response",s:"I"},{t:"Convene whoever needs to be involved right away",s:"E"}]},
  {id:"ei11",l:"Your relationship with networking events is...",                     o:[{t:"I enjoy them -- meeting people is genuinely fun",s:"E"},{t:"I go when I have to -- they cost me energy",s:"I"},{t:"I'd rather meet one person deeply than 20 briefly",s:"I"},{t:"I thrive there -- they're where opportunities happen",s:"E"}]},
  {id:"ei12",l:"When pitching or presenting, you feel...",                           o:[{t:"Alive -- I love having an audience",s:"E"},{t:"Prepared but it costs me energy",s:"I"},{t:"Fine in small groups, not large audiences",s:"I"},{t:"Like I could do it on a loop",s:"E"}]},
  {id:"ei13",l:"After a hard week, your version of recovery is...",                  o:[{t:"Seeing friends, going out, being social",s:"E"},{t:"Staying home, reading, being alone",s:"I"},{t:"A long solo walk or solo trip",s:"I"},{t:"A party or event to shift the energy",s:"E"}]},
  {id:"ei14",l:"You build your best business relationships...",                      o:[{t:"Quickly -- I connect fast and build rapport",s:"E"},{t:"Slowly -- selective and go deep over time",s:"I"},{t:"Through consistent one-on-one conversations",s:"I"},{t:"Through visibility, events, and shared spaces",s:"E"}]},
  {id:"ei15",l:"In a team, you tend to...",                                          o:[{t:"Drive energy and discussion in the room",s:"E"},{t:"Contribute deeply in focused 1:1 settings",s:"I"},{t:"Do your best thinking before the meeting",s:"I"},{t:"Rally and motivate everyone around you",s:"E"}]},
],
SN:[
  {id:"sn1", l:"When imagining your business in 5 years, you picture...",            o:[{t:"Specific metrics -- revenue, team, locations",s:"S"},{t:"The broader impact -- what will have changed",s:"N"},{t:"The texture of daily work -- what a Tuesday feels like",s:"S"},{t:"Entirely new possibilities the business could open",s:"N"}]},
  {id:"sn2", l:"You're most energized when you're...",                               o:[{t:"Executing a plan that's clearly working",s:"S"},{t:"Exploring a concept that hasn't been built yet",s:"N"},{t:"Refining and optimizing something proven",s:"S"},{t:"Connecting dots others haven't noticed",s:"N"}]},
  {id:"sn3", l:"You trust more in...",                                               o:[{t:"Proven playbooks -- what worked before, refined",s:"S"},{t:"First principles -- reason from scratch every time",s:"N"},{t:"Hard data -- show me the numbers",s:"S"},{t:"Pattern recognition and intuition about trends",s:"N"}]},
  {id:"sn4", l:"When describing your business idea, you...",                         o:[{t:"Give concrete specifics -- what it is, how it works",s:"S"},{t:"Paint a vision -- where it's going, what it changes",s:"N"},{t:"Walk through the operational details",s:"S"},{t:"Talk about the implications and future possibilities",s:"N"}]},
  {id:"sn5", l:"You find business plans most useful when they...",                   o:[{t:"Include detailed steps, timelines, and numbers",s:"S"},{t:"Articulate the vision and strategic direction",s:"N"},{t:"Break down costs and operational specifics",s:"S"},{t:"Capture the market opportunity and future landscape",s:"N"}]},
  {id:"sn6", l:"When solving a business problem, your first move is...",             o:[{t:"Gather every relevant fact and piece of data",s:"S"},{t:"Step back and look for underlying patterns",s:"N"},{t:"Find out what worked in analogous situations",s:"S"},{t:"Challenge the framing -- maybe it's the wrong problem",s:"N"}]},
  {id:"sn7", l:"Your most natural strength in business is...",                       o:[{t:"Execution -- I make things actually happen",s:"S"},{t:"Vision -- I see around corners others can't",s:"N"},{t:"Detail -- nothing falls through the cracks",s:"S"},{t:"Synthesis -- connecting ideas across domains",s:"N"}]},
  {id:"sn8", l:"When evaluating a market opportunity, you focus on...",              o:[{t:"Current demand and proven customer behavior",s:"S"},{t:"Emerging trends and where the market is heading",s:"N"},{t:"Competitive landscape and existing benchmarks",s:"S"},{t:"Whitespace nobody has thought to fill yet",s:"N"}]},
  {id:"sn9", l:"The business books you're drawn to are...",                          o:[{t:"Operational playbooks and proven frameworks",s:"S"},{t:"Big idea books that change how you see the world",s:"N"},{t:"Case studies of real companies that succeeded or failed",s:"S"},{t:"Visionary books about where industries are heading",s:"N"}]},
  {id:"sn10",l:"When stuck in your business, your instinct is...",                   o:[{t:"Go back to basics -- what's the actual problem?",s:"S"},{t:"Zoom out -- maybe the whole approach needs rethinking",s:"N"},{t:"Find someone who's solved this exact problem before",s:"S"},{t:"Look for an unconventional angle nobody has tried",s:"N"}]},
  {id:"sn11",l:"Your relationship with data is...",                                  o:[{t:"I need data to make any major decision",s:"S"},{t:"Useful but I don't need it to know where I'm going",s:"N"},{t:"I track everything obsessively",s:"S"},{t:"I use it to confirm or challenge my instincts",s:"N"}]},
  {id:"sn12",l:"When building a brand, you think first about...",                    o:[{t:"What the product actually does and who it serves",s:"S"},{t:"What feeling and identity it should create",s:"N"},{t:"The spec sheet -- features, deliverables, pricing",s:"S"},{t:"What cultural moment or shift it connects to",s:"N"}]},
  {id:"sn13",l:"Your ideal role in a company is...",                                 o:[{t:"Running operations -- keeping the engine working",s:"S"},{t:"Setting strategy -- deciding where the engine should go",s:"N"},{t:"Managing projects and ensuring delivery",s:"S"},{t:"Innovating -- finding what the engine should become",s:"N"}]},
  {id:"sn14",l:"When something unexpected disrupts your business, you...",           o:[{t:"Deal with the immediate practical reality first",s:"S"},{t:"Think about what this signals for the broader strategy",s:"N"},{t:"Assess the concrete damage and build a fix",s:"S"},{t:"Wonder if this is actually an opportunity in disguise",s:"N"}]},
  {id:"sn15",l:"When you describe your business model, you naturally talk about...", o:[{t:"Revenue streams, unit economics, and margins",s:"S"},{t:"The thesis -- why this works and where it leads",s:"N"},{t:"The operational workflow and delivery mechanism",s:"S"},{t:"The platform potential and future expansion paths",s:"N"}]},
],
TF:[
  {id:"tf1", l:"What matters more to you in a business decision?",                 o:[{t:"The most logical and efficient outcome",s:"T"},{t:"The impact on the people involved",s:"F"},{t:"Which generates the best financial return",s:"T"},{t:"Which aligns with our values and mission",s:"F"}]},
  {id:"tf2", l:"An unhappy client contacts you. Your first instinct is...",          o:[{t:"Analyze what went wrong and fix the process",s:"T"},{t:"Apologize genuinely and make them feel heard first",s:"F"},{t:"Offer a concrete resolution immediately",s:"T"},{t:"Understand their full experience before deciding",s:"F"}]},
  {id:"tf3", l:"A partner makes a decision you disagree with. You...",               o:[{t:"Make your case with evidence and logic immediately",s:"T"},{t:"Consider their perspective and feelings first",s:"F"},{t:"Pull data to show your position is stronger",s:"T"},{t:"Have a conversation to understand their reasoning",s:"F"}]},
  {id:"tf4", l:"When pricing your services, your primary consideration is...",       o:[{t:"Cost structure plus margin -- what makes mathematical sense",s:"T"},{t:"What feels fair and accessible for the clients I want",s:"F"},{t:"Market positioning -- what signals the right tier",s:"T"},{t:"The real value I'm creating for this specific person",s:"F"}]},
  {id:"tf5", l:"A team member is underperforming. You...",                           o:[{t:"Have a direct conversation about the gap and timeline",s:"T"},{t:"Start by understanding what's going on in their life",s:"F"},{t:"Set measurable targets and review milestones",s:"T"},{t:"Find a way to set them up for success in a different role",s:"F"}]},
  {id:"tf6", l:"The most important quality in a business is...",                     o:[{t:"Efficiency and measurable results",s:"T"},{t:"The genuine impact it has on people's lives",s:"F"},{t:"Its strategic positioning and competitive advantage",s:"T"},{t:"The culture and values it embodies",s:"F"}]},
  {id:"tf7", l:"When building a brand, you care most about...",                      o:[{t:"Differentiation and strategic positioning",s:"T"},{t:"The emotional resonance it creates with customers",s:"F"},{t:"Whether it drives conversion and revenue",s:"T"},{t:"Whether it authentically represents what we stand for",s:"F"}]},
  {id:"tf8", l:"You'd be more bothered by a business that...",                       o:[{t:"Is inefficient and wasteful with resources",s:"T"},{t:"Doesn't treat its team or customers with genuine care",s:"F"},{t:"Isn't hitting its numbers or growing",s:"T"},{t:"Has lost its soul -- exists only to make money",s:"F"}]},
  {id:"tf9", l:"A friend asks for honest business advice. You naturally...",         o:[{t:"Give unfiltered analysis, even if it's hard to hear",s:"T"},{t:"Lead with empathy and support before any critique",s:"F"},{t:"Tell them what they need to hear, not what they want",s:"T"},{t:"Help them see all sides and reach their own conclusion",s:"F"}]},
  {id:"tf10",l:"When negotiating with a vendor or partner, you focus on...",         o:[{t:"Getting the best possible deal for my business",s:"T"},{t:"Building a relationship where both sides feel good",s:"F"},{t:"Clarity on terms and protecting my interests",s:"T"},{t:"Long-term trust over short-term gains",s:"F"}]},
  {id:"tf11",l:"When you have to let someone go, you...",                            o:[{t:"Do it cleanly and directly -- it's the right call",s:"T"},{t:"Take time to make it as humane as possible",s:"F"},{t:"Follow the documented process regardless",s:"T"},{t:"Look for every possible alternative first",s:"F"}]},
  {id:"tf12",l:"Your employees would say you...",                                    o:[{t:"Give clear expectations and hold people accountable",s:"T"},{t:"Make people feel seen, valued, and supported",s:"F"},{t:"Are direct, efficient, and results-oriented",s:"T"},{t:"Build loyalty and genuine team culture",s:"F"}]},
  {id:"tf13",l:"When evaluating two strategies, you ask...",                         o:[{t:"Which one has better numbers and evidence?",s:"T"},{t:"Which one feels more aligned with who we want to be?",s:"F"},{t:"Which generates more sustainable return?",s:"T"},{t:"Which one do we believe in most deeply?",s:"F"}]},
  {id:"tf14",l:"A competitor launches something similar. You...",                    o:[{t:"Analyze their approach objectively and benchmark",s:"T"},{t:"Feel it personally but use it to fuel your drive",s:"F"},{t:"Focus on your data -- are customers choosing them?",s:"T"},{t:"Trust your customer relationships to carry you through",s:"F"}]},
  {id:"tf15",l:"The hardest part of building a business, for you, is...",            o:[{t:"Dealing with emotional and interpersonal complexity",s:"T"},{t:"Making hard decisions that hurt people even when right",s:"F"},{t:"The ambiguity when logic isn't enough to decide",s:"T"},{t:"Staying tough when the mission requires painful choices",s:"F"}]},
],
JP:[
  {id:"jp1", l:"Your approach to your workday is...",                                o:[{t:"Scheduled and planned before I even start",s:"J"},{t:"Flexible -- I work on what feels most urgent",s:"P"},{t:"A loose structure I adapt constantly",s:"P"},{t:"Time-blocked with specific goals for each block",s:"J"}]},
  {id:"jp2", l:"When launching something new, you prefer to...",                     o:[{t:"Have everything ready and polished before going public",s:"J"},{t:"Launch fast and iterate from real feedback",s:"P"},{t:"Test with a small group first, then plan the rollout",s:"J"},{t:"Ship it -- done always beats perfect",s:"P"}]},
  {id:"jp3", l:"How do you handle uncertainty in a new venture?",                   o:[{t:"I reduce it -- research, plan, then act decisively",s:"J"},{t:"I embrace it -- uncertainty is where opportunity hides",s:"P"},{t:"I tolerate it while working steadily toward clarity",s:"J"},{t:"I thrive on it -- best decisions come under pressure",s:"P"}]},
  {id:"jp4", l:"Your approach to business finances is...",                            o:[{t:"Detailed tracking, budgets, and monthly reviews",s:"J"},{t:"General awareness -- I check in when it matters",s:"P"},{t:"I know roughly where I stand at all times",s:"J"},{t:"I deal with finances when they demand attention",s:"P"}]},
  {id:"jp5", l:"Your relationship with deadlines is...",                              o:[{t:"Sacred -- I hit them, always, even if I'm last to sleep",s:"J"},{t:"Guidelines -- I aim for them but adapt when needed",s:"P"},{t:"I work best under pressure right before them",s:"P"},{t:"I build buffer in -- I'm usually done early",s:"J"}]},
  {id:"jp6", l:"When running a business, you'd prefer...",                            o:[{t:"Clear systems, documented processes, defined roles",s:"J"},{t:"Flexibility to adapt as each situation requires",s:"P"},{t:"A mix -- structure where it matters, freedom elsewhere",s:"P"},{t:"Defined accountability and regular review cadences",s:"J"}]},
  {id:"jp7", l:"Your ideal planning horizon is...",                                   o:[{t:"12-24 months out with milestones mapped",s:"J"},{t:"The next 30-60 days -- I plan short and pivot fast",s:"P"},{t:"Quarterly -- enough to be directional, not rigid",s:"P"},{t:"Annual with quarterly checkpoints I take seriously",s:"J"}]},
  {id:"jp8", l:"When your business plan changes significantly, you...",               o:[{t:"Update the plan formally and communicate the new direction",s:"J"},{t:"Adapt in real time -- plans always change anyway",s:"P"},{t:"Feel friction but execute the pivot decisively",s:"J"},{t:"Welcome it -- pivots mean you're learning something real",s:"P"}]},
  {id:"jp9", l:"How do you feel about standard operating procedures?",              o:[{t:"Essential -- they're how you scale consistency",s:"J"},{t:"Useful in places but too rigid to rely on heavily",s:"P"},{t:"Important -- I document everything that matters",s:"J"},{t:"Overrated -- context changes too fast for rigid playbooks",s:"P"}]},
  {id:"jp10",l:"When given a choice between two paths, you...",                       o:[{t:"Want it decided and settled so you can plan around it",s:"J"},{t:"Keep options open as long as possible",s:"P"},{t:"Gather info quickly and commit to one direction",s:"J"},{t:"See what emerges before locking anything in",s:"P"}]},
  {id:"jp11",l:"Your relationship with your to-do list is...",                        o:[{t:"I live by it -- if it's not listed it won't get done",s:"J"},{t:"More of a loose inspiration than a strict guide",s:"P"},{t:"I update it constantly as priorities shift",s:"P"},{t:"Organized by urgency and importance, reviewed daily",s:"J"}]},
  {id:"jp12",l:"When hiring, you prefer candidates who...",                           o:[{t:"Are structured, reliable, and process-oriented",s:"J"},{t:"Are adaptable, creative, and comfortable with ambiguity",s:"P"},{t:"Follow through consistently and hit their commitments",s:"J"},{t:"Can pivot fast and thrive in changing conditions",s:"P"}]},
  {id:"jp13",l:"Your approach to product development is...",                          o:[{t:"Thorough -- spec it fully, build it right, then launch",s:"J"},{t:"Iterative -- launch rough and improve in public",s:"P"},{t:"Milestone-based with clear quality gates",s:"J"},{t:"Continuous -- never really done, always evolving",s:"P"}]},
  {id:"jp14",l:"When something unexpected disrupts your week, you...",                o:[{t:"Feel the friction but work to restore the original plan",s:"J"},{t:"Adapt quickly -- unexpected is just a new normal",s:"P"},{t:"Triage and reschedule with clear new commitments",s:"J"},{t:"Find it kind of energizing -- I work well in chaos",s:"P"}]},
  {id:"jp15",l:"Your vision for your business structure is...",                       o:[{t:"Clear org chart, defined roles, documented processes",s:"J"},{t:"Flat and fluid -- structure should follow the work",s:"P"},{t:"Structured enough to scale, not so rigid it stifles",s:"J"},{t:"Minimal -- trust the people, skip the bureaucracy",s:"P"}]},
],
};

// -- 150 question pool -------------------------------------------------
const Q_POOL = {
// ALWAYS INCLUDED -- critical for idea generation
anchors:[
  {id:"location",   s:"Your market",    l:"Where are you based, and where would you do business?",                                  type:"location", h:"City, State, Country -- and your intended market"},
  {id:"capital",    s:"Your situation", l:"What's your financial runway to start something?",                                       type:"mc",       o:CAPITAL_OPTIONS},
  {id:"hours",      s:"Your situation", l:"How many hours per week could you realistically commit?",                                type:"mc",       o:["Under 5 (side project)","5-15 (serious side hustle)","15-30 (part-time founder)","30+ (near full-time)","Full time from day one"]},
  {id:"work_hist",  s:"Your experience",l:"What kinds of work have you done in your life?",                                         type:"open",     h:"Everything -- jobs, gigs, side hustles, volunteer work, anything."},
  {id:"languages",  s:"Your background",l:"What languages do you speak beyond English, and at what level?",                        type:"open",     h:"Include any level -- basic conversation, business proficient, fluent, native. Even partial fluency matters."},
  {id:"community",  s:"Your background",l:"What cultural communities, demographic groups, or professional networks do you have genuine insider access to?", type:"open", h:"Where would you be welcomed as an insider -- not treated as an outsider trying to break in?"},
  {id:"problem",    s:"What drives you",l:"What problem in the world genuinely bothers you every time you think about it?",         type:"open",     h:"The best businesses solve problems their founders are personally frustrated by."},
  {id:"success",    s:"What drives you",l:"What does success mean to you personally?",                                             type:"mc",       o:["Financial freedom -- never worry about money","Building something that outlasts me","Recognition for my work","Making a real difference","Stability for my family"]},
  {id:"feeling",    s:"One last thing", l:"One word. How do you want to feel about your work every single day?",                    type:"open",     h:"First word that comes to mind. Don't overthink it."},
  {id:"idea_hist",  s:"One last thing", l:"Have you ever had a business idea, even one you immediately dismissed?",                 type:"open",     h:"Even the unrealistic ones. Name it."},
],
// OPTIONAL -- draw 12 per session
energy:[
  {id:"e1", s:"Getting to know you",l:"How do you recharge after a demanding week?",                       type:"mc",  o:["Alone at home -- total quiet","With one or two close people","Out with a larger group","Physical activity clears my head","It depends on the week"]},
  {id:"e2", s:"Getting to know you",l:"Your ideal work environment is...",                                   type:"mc",  o:["Home office, solo, deep focus","Coffee shop -- ambient noise helps","Busy office with people around","Outdoors or constantly changing","Hybrid -- I need variety"]},
  {id:"e3", s:"Getting to know you",l:"When you need to generate ideas, you...",                             type:"mc",  o:["Brainstorm out loud with others","Think alone and write things down","Research what others have done first","Get into conversation and see where it goes","Try things and see what sparks"]},
  {id:"e4", s:"Getting to know you",l:"When overwhelmed, your first instinct is to...",                      type:"mc",  o:["Call someone and talk it through","Need to be alone to reset","Write or journal to process it","Go somewhere with people to get out of my head","Get busy -- action cures overwhelm"]},
  {id:"e5", s:"Getting to know you",l:"The time of day you do your best thinking is...",                     type:"mc",  o:["Early morning before 9am","Mid-morning 9am-noon","Afternoon","Evening","Late night -- when everything is quiet"]},
  {id:"e6", s:"Getting to know you",l:"When given a completely free afternoon with no obligations, you...",  type:"open",h:"What do you actually do, not what you think you should do."},
  {id:"e7", s:"Getting to know you",l:"Your relationship with silence is...",                                type:"mc",  o:["I crave it -- silence is where I think","I enjoy it in doses","I find it uncomfortable -- I prefer ambient sound","It depends entirely on what I'm doing","I fill it -- I always have music or podcasts on"]},
  {id:"e8", s:"Getting to know you",l:"How long you can sustain intense focus before needing a break...",    type:"mc",  o:["20-30 minutes max","30-60 minutes","1-2 hours in deep flow","Half days or more when in the zone","Until the work is done -- I don't track it"]},
],
personality:[
  {id:"p1", s:"Your personality",l:"Your close friends would describe you as...",                            type:"mc",  o:["The reliable, organized one","The creative, idea-generating one","The empathetic, people-focused one","The analytical, research-everything one","The ambitious, always-building one"]},
  {id:"p2", s:"Your personality",l:"When you face a big decision, you tend to...",                           type:"mc",  o:["Research everything before moving","Trust your gut and adjust as you go","Talk it through with people you trust","Make a pros/cons list or framework","Delay until it feels right"]},
  {id:"p3", s:"Your personality",l:"When you get excited about something new, your first move is...",        type:"mc",  o:["Tell everyone about it immediately","Research it obsessively and quietly","Start doing something related right now","Think about it privately for days","Make a detailed plan before touching it"]},
  {id:"p4", s:"Your personality",l:"Your natural leadership style is...",                                    type:"mc",  o:["Lead from the front -- clear vision, decisive","Collaborative -- I build consensus before moving","Lead by example -- do the work, others follow","Situational -- I adapt to the moment","I prefer not to lead -- I excel supporting someone"]},
  {id:"p5", s:"Your personality",l:"A belief you hold about work that most people around you don't share...",type:"open",h:"The unconventional thing you believe about how business or work should be done."},
  {id:"p6", s:"Your personality",l:"When stressed at work, you tend to...",                                  type:"mc",  o:["Power through -- pressure is fuel","Pull back and need recovery space","Talk to someone close to me","Go physical -- exercise, move","Distract -- watch something, read, escape"]},
  {id:"p7", s:"Your personality",l:"Your relationship with routine is...",                                   type:"mc",  o:["I love it -- consistency is how I operate","I need some structure but value flexibility","Routine kills me -- I need variety","I build routines then abandon them","I adapt structure to what I'm building"]},
  {id:"p8", s:"Your personality",l:"When someone gives you feedback you disagree with, you...",              type:"mc",  o:["Engage directly -- debate if needed","Listen politely and decide privately later","Genuinely reconsider -- I might be wrong","Thank them and mostly ignore it","Depends entirely on who gave it"]},
  {id:"p9", s:"Your personality",l:"Your relationship with perfectionism is...",                             type:"mc",  o:["I'm a perfectionist -- quality is everything","I aim for excellence but know when to stop","I default to done over perfect","I'm selective -- perfectionist about some things, not others","I used to be, but I've learned to let go"]},
  {id:"p10",s:"Your personality",l:"Describe something you've gotten genuinely obsessed with learning.",    type:"open",h:"Any topic, skill, or niche -- ever. Doesn't have to be professional."},
  {id:"p11",s:"Your personality",l:"How you handle conflict at work is...",                                  type:"mc",  o:["I address it directly and immediately","I let it sit, then address it calmly","I avoid it -- conflict costs me energy","I try to find common ground before anything","I escalate if needed -- some conflict needs resolution from above"]},
  {id:"p12",s:"Your personality",l:"When you feel bored at work, you tend to...",                            type:"mc",  o:["Create a new challenge or project","Get restless and unfocused","Look for ways to optimize what exists","Check out mentally until something interesting arrives","Leave -- boredom is a signal I'm in the wrong place"]},
  {id:"p13",s:"Your personality",l:"Your relationship with authority and rules is...",                       type:"mc",  o:["I respect structure -- it exists for good reason","I follow rules unless clearly wrong","I question everything -- I need to understand why","I work around things that slow me down","Rules are suggestions until proven otherwise"]},
  {id:"p14",s:"Your personality",l:"A personality trait you've had to consciously develop to succeed...",    type:"open",h:"The thing that didn't come naturally but you worked on."},
  {id:"p15",s:"Your personality",l:"What curiosity looks like for you...",                                   type:"open",h:"What you can't stop reading, learning, or thinking about right now."},
],
work:[
  {id:"w1", s:"Your experience",l:"What part of your past work did you actually enjoy, even a little?",   type:"open",h:"Even the worst job usually had one thing."},
  {id:"w2", s:"Your experience",l:"What do people consistently come to you for help with?",               type:"open",h:"Friends, family, colleagues -- what do they count on you for?"},
  {id:"w3", s:"Your experience",l:"What are you noticeably better at than most people around you?",       type:"open",h:"Be honest -- this is a strength inventory, not a humble exercise."},
  {id:"w4", s:"Your experience",l:"How do you feel about selling, pitching, or persuading people?",       type:"mc",  o:["I genuinely enjoy it -- it energizes me","I can do it when needed but it drains me","Comfortable one-on-one, not in groups","I avoid it at almost any cost","Never really tried but I'm open"]},
  {id:"w5", s:"Your experience",l:"Your relationship with technology is...",                                type:"mc",  o:["Technical -- I build or configure things","Comfortable using tools, not building","I use what I need and nothing more","I struggle with new tools and prefer simple","I love finding and testing new tools"]},
  {id:"w6", s:"Your experience",l:"Have you ever managed or led other people?",                           type:"mc",  o:["Yes -- formally, teams or departments","Informally -- projects, groups, communities","A little -- mentoring or guiding individuals","Not yet, but I want to","No, and I prefer not to"]},
  {id:"w7", s:"Your experience",l:"What's your biggest professional achievement so far?",                 type:"open",h:"Big or small -- what are you genuinely proud of?"},
  {id:"w8", s:"Your experience",l:"What skill do you wish you had but don't yet?",                        type:"open",h:"The gap you're most aware of."},
  {id:"w9", s:"Your experience",l:"When you're not sure how to do something, you...",                       type:"mc",  o:["Research it thoroughly before starting","Figure it out by doing","Ask someone who knows","Find a course or structured learning","Hire or partner with someone who knows"]},
  {id:"w10",s:"Your experience",l:"What's something you've taught yourself completely on your own?",      type:"open",h:"Anything counts -- professional or personal."},
  {id:"w11",s:"Your experience",l:"What type of customer or client do you most enjoy working with?",      type:"open",h:"Describe who you do your best work for."},
  {id:"w12",s:"Your experience",l:"What work have you done that felt genuinely meaningful?",              type:"open",h:"The kind that made you forget to check the time."},
  {id:"w13",s:"Your experience",l:"Languages you speak beyond English?",                                  type:"open",h:"Any level -- include languages you can hold a business conversation in."},
  {id:"w14",s:"Your experience",l:"Industries you understand deeply from the inside?",                    type:"open",h:"Sectors where you know how things really work, not just surface level."},
  {id:"w15",s:"Your experience",l:"A professional failure you learned the most from?",                    type:"open",h:"What happened and what changed after."},
  {id:"w16",s:"Your experience",l:"Your working style is best described as...",                             type:"mc",  o:["Methodical and systematic","Fast and instinct-driven","Deep and thorough -- I don't half-do things","Adaptive -- I shift to match what's needed","Creative and exploratory"]},
  {id:"w17",s:"Your experience",l:"What your professional reputation is in your field...",                  type:"open",h:"What people who've worked with you would say behind your back -- the good version."},
  {id:"w18",s:"Your experience",l:"Tools, software, or platforms you're genuinely proficient with?",      type:"open",h:"Name the specific ones, not just categories."},
  {id:"w19",s:"Your experience",l:"Something unique about how you approach your work?",                   type:"open",h:"The thing colleagues notice that sets you apart from others in your field."},
  {id:"w20",s:"Your experience",l:"Have you ever built or made something physical?",                      type:"open",h:"Products, tools, spaces, systems -- anything tangible you created."},
],
money:[
  {id:"m1", s:"Your situation",l:"Your risk tolerance in your personal life is...",                         type:"mc",  o:["Very low -- I always choose the safe option","Low -- I'll take small, calculated risks","Medium -- I'll bet meaningfully on good odds","High -- risk is where the upside lives","Depends entirely on what I know about the situation"]},
  {id:"m2", s:"Your situation",l:"What income level in year 3 would feel like real success?",             type:"mc",  o:["$30-60K/year -- replace my current income","$60-120K/year -- comfortable independence","$120-300K/year -- genuinely thriving","$300K+/year -- building real wealth","I care more about impact than income right now"]},
  {id:"m3", s:"Your situation",l:"A financial milestone that would actually change your life?",            type:"open",h:"Be specific -- a number, a situation, a feeling."},
  {id:"m4", s:"Your situation",l:"Do you have dependents, a mortgage, or significant obligations?",       type:"mc",  o:["Yes -- people depend on my income","Some obligations but manageable","Minimal -- I have real financial flexibility","None -- I'm completely free to take risk","Some I'm actively working to reduce"]},
  {id:"m5", s:"Your situation",l:"When do you need this to generate meaningful income?",                   type:"mc",  o:["3-6 months -- I need it soon","6-12 months -- I have some runway","1-2 years -- I can be patient","3+ years -- this is a long-term play","No timeline -- I'm exploring"]},
  {id:"m6", s:"Your situation",l:"Your current employment situation is...",                                 type:"mc",  o:["Employed full-time -- building on the side","Employed part-time -- have some flexibility","Freelancing or self-employed already","Between jobs -- good timing to build","Student -- this is the beginning"]},
  {id:"m7", s:"Your situation",l:"Previous experience making money outside a traditional job?",            type:"open",h:"Side gigs, freelance, flips, anything. What did you learn?"},
  {id:"m8", s:"Your situation",l:"Your preferred revenue model, if you could choose?",                    type:"mc",  o:["Monthly recurring subscriptions","One-time fees for services or projects","Commission or revenue share","Physical product sales","Multiple streams -- I want diversification"]},
  {id:"m9", s:"Your situation",l:"Your relationship with debt is...",                                       type:"mc",  o:["Debt-free and intend to stay that way","Comfortable with strategic debt","Currently carrying significant debt","Learning to manage it","Debt doesn't scare me if the ROI is clear"]},
  {id:"m10",s:"Your situation",l:"What you'd be willing to sacrifice to make this work?",                 type:"open",h:"Time, comfort, income, relationships -- what's actually on the table for you?"},
],
motivations:[
  {id:"mo1",s:"What drives you",l:"If money wasn't a factor at all, how would you spend your time?",      type:"open",h:"The most important question. Take your time with this one."},
  {id:"mo2",s:"What drives you",l:"Five years from now, working for yourself -- what does a Tuesday morning look like?",type:"open",h:"Where are you? What are you doing? Who's around you?"},
  {id:"mo3",s:"What drives you",l:"Who do you admire -- doesn't have to be famous -- and what specifically do they have that you want?",type:"open",h:"Name a real person and the specific quality."},
  {id:"mo4",s:"What drives you",l:"What have you always secretly wanted to do but talked yourself out of?",type:"open",h:"The thing you've dismissed as unrealistic but keeps coming back."},
  {id:"mo5",s:"What drives you",l:"What would you regret NOT having tried in 20 years?",                  type:"open",h:"Looking back from age 65+, what would sting?"},
  {id:"mo6",s:"What drives you",l:"What do you want to be known for -- professionally or personally?",     type:"open",h:"Your reputation, your contribution, your legacy."},
  {id:"mo7",s:"What drives you",l:"Your primary motivation for building a business is...",                  type:"mc",  o:["Freedom -- time, location, and financial independence","Impact -- making something that genuinely helps people","Wealth -- building significant financial assets","Creativity -- expressing ideas without constraints","Legacy -- building something that outlasts me","Challenge -- proving I can do something hard"]},
  {id:"mo8",s:"What drives you",l:"What change do you want to make in the way your industry operates?",   type:"open",h:"The thing that's broken that you could fix."},
  {id:"mo9",s:"What drives you",l:"The impact you want to have in one sentence.",                         type:"open",h:"Your contribution. Not your business -- your impact."},
  {id:"mo10",s:"What drives you",l:"What problem have you already solved for yourself that others still struggle with?",type:"open",h:"The insight you have from lived experience that others don't."},
  {id:"mo11",s:"What drives you",l:"What would you do with $10M and 10 years if you had to do the most good?",type:"open",h:"No constraints. What matters most to you at that scale?"},
  {id:"mo12",s:"What drives you",l:"What keeps you going when things get genuinely hard?",                 type:"open",h:"Your real source of resilience -- not the polished answer."},
  {id:"mo13",s:"What drives you",l:"What does freedom mean to you, specifically?",                        type:"open",h:"Not the concept -- the feeling, the situation, the day."},
  {id:"mo14",s:"What drives you",l:"Why now? What's made this the right time for you to build something?", type:"open",h:"The honest answer about what's shifted."},
  {id:"mo15",s:"What drives you",l:"What business or mission would make you work 80 hours a week without resentment?",type:"open",h:"The thing you'd grind for -- because it actually matters to you."},
],
wildcards:[
  {id:"wc1",s:"Wild card",l:"If you had 6 months, $50K, and no obligations -- what would you build?",      type:"open",h:"The thing you'd actually do, not the responsible answer."},
  {id:"wc2",s:"Wild card",l:"What's the most useful thing you know that most people don't?",              type:"open",h:"Any domain -- professional, technical, personal, cultural."},
  {id:"wc3",s:"Wild card",l:"What product or service do you wish existed but doesn't?",                   type:"open",h:"The thing you've looked for and couldn't find."},
  {id:"wc4",s:"Wild card",l:"If a stranger asked what you do, what would you WANT to say?",               type:"open",h:"Not what you currently say -- what you'd want to be able to say."},
  {id:"wc5",s:"Wild card",l:"What's something people vastly overpay for that you could do better?",       type:"open",h:"Where do you see the gap between price and actual value?"},
  {id:"wc6",s:"Wild card",l:"What have you done that others thought was crazy but turned out right?",      type:"open",h:"The counterintuitive bet that worked."},
  {id:"wc7",s:"Wild card",l:"What conversation do you keep having about a problem that needs solving?",    type:"open",h:"The thing you've complained about or discussed repeatedly."},
  {id:"wc8",s:"Wild card",l:"What business have you fantasized about starting, even briefly?",             type:"open",h:"Even the embarrassing or unrealistic ones."},
  {id:"wc9",s:"Wild card",l:"What do you do for fun that other people say you're unusually good at?",     type:"open",h:"The hobby or passion that others notice."},
  {id:"wc10",s:"Wild card",l:"What's something underrated that you think is actually really valuable?",    type:"open",h:"The thing you'd champion that most people overlook."},
  {id:"wc11",s:"Wild card",l:"What technology, tool, or platform are you genuinely excited about?",        type:"open",h:"The thing you've been following closely."},
  {id:"wc12",s:"Wild card",l:"If you could be the go-to expert in one thing, what would it be?",           type:"open",h:"The domain where you'd want to be the person people call."},
  {id:"wc13",s:"Wild card",l:"What trend are you personally betting on in the next 5 years?",             type:"open",h:"Where you think the world is going, based on what you're seeing."},
  {id:"wc14",s:"Wild card",l:"What's the last thing you stayed up too late reading about?",               type:"open",h:"The rabbit hole you fell into recently."},
  {id:"wc15",s:"Wild card",l:"If you had to teach a 2-hour masterclass tomorrow, what would it be on?",   type:"open",h:"The topic where you'd feel genuinely qualified to teach."},
  {id:"wc16",s:"Wild card",l:"What's your guilty pleasure business idea?",                                type:"open",h:"The one you've thought about but been too embarrassed to say out loud."},
  {id:"wc17",s:"Wild card",l:"What's broken in your industry that everyone complains about but nobody fixes?",type:"open",h:"The open secret in your field."},
],
lifestyle:[
  {id:"l1", s:"Your lifestyle",l:"Which lifestyle does your ideal business support?",                     type:"mc",  o:["Location-independent -- I work from anywhere","Based in my city -- local roots matter","Travel-heavy -- presence in multiple places","Home-based -- I want to stay close to family","Office-based -- I want that structure and separation"]},
  {id:"l2", s:"Your lifestyle",l:"How do you feel about managing people full-time?",                      type:"mc",  o:["I love it -- building teams is part of the vision","Okay with it as a necessary part of growth","I'd rather stay small -- tight team or solo","I want to scale without a large headcount","Haven't thought about it seriously yet"]},
  {id:"l3", s:"Your lifestyle",l:"Describe your ideal day 3 years from now in as much detail as you can.",type:"open",h:"Where are you? What time do you wake up? Who's around you?"},
  {id:"l4", s:"Your lifestyle",l:"How important is it that your business aligns with your personal values?",type:"mc", o:["Non-negotiable -- I can't work on something I don't believe in","Very important -- I need to feel good about it","Somewhat -- I need to not feel bad about it","Minimal -- business is business","I'm still figuring out what my values are"]},
  {id:"l5", s:"Your lifestyle",l:"What does your ideal team look like -- or do you prefer to work alone?", type:"open",h:"Size, culture, dynamic. Or: why you'd rather go solo."},
  {id:"l6", s:"Your lifestyle",l:"In 5 years, what would make you feel like you made the right choice?",  type:"mc",  o:["Financial -- earning more than I ever imagined","Freedom -- total control over my time","Impact -- my work has genuinely helped people","Legacy -- built something that outlasts me","Growth -- I've become a better version of myself"]},
  {id:"l7", s:"Your lifestyle",l:"What does 'enough' look like to you -- financially, professionally, personally?",type:"open",h:"When would you feel like you've arrived?"},
  {id:"l8", s:"Your lifestyle",l:"Your ideal business size in 5 years is...",                              type:"mc",  o:["Solo or micro -- just me, maybe 1-2 helpers","Small team -- 3-10 people I know and trust","Medium -- 10-50 people, real infrastructure","Large -- 50+ people, a real organization","Whatever it needs to be to hit my goals"]},
  {id:"l9", s:"Your lifestyle",l:"Work-life integration vs separation -- how do you prefer it?",           type:"mc",  o:["Fully integrated -- I don't separate work and life","Clear boundaries -- work ends and life begins","Seasonal -- intense sprints then real downtime","I'm still figuring this out","Different for different phases of the business"]},
],
context:[
  {id:"c1", s:"Your market",   l:"Your network in your target industry is...",                              type:"mc",  o:["Strong -- people would buy from day one","Moderate -- some connections to leverage","Thin -- I'd need to build from scratch","Non-existent -- I'm starting somewhere new","Not sure which industry yet"]},
  {id:"c2", s:"Your market",   l:"How much business experience do you have?",                             type:"mc",  o:["None -- this would be my first venture","A little -- I've tried things informally","Some -- I've run a side hustle or small project","Moderate -- I've built something with real revenue","Significant -- I've run businesses before"]},
  {id:"c3", s:"Your market",   l:"Is there someone in your life who would be affected by this decision? How do they feel about it?",type:"open",h:"Partner, family, dependents -- the honest picture."},
  {id:"c4", s:"Your market",   l:"What's holding you back right now more than anything else?",            type:"open",h:"The real blocker -- not the polished answer."},
  {id:"c5", s:"Your market",   l:"What's your biggest fear about starting a business?",                   type:"mc",  o:["Failing publicly and what people will think","Running out of money before it works","Not knowing enough to pull it off","Doing it alone without support","Not having enough time alongside current obligations"]},
  {id:"c6", s:"Your market",   l:"What would have to be true for you to feel ready?",                     type:"open",h:"The conditions you're waiting for -- named honestly."},
],
};

function shuffle(a) { return [...a].sort(()=>Math.random()-0.5); }

function drawMBTI() {
  return [
    ...shuffle(MBTI_POOL.EI).slice(0,3),
    ...shuffle(MBTI_POOL.SN).slice(0,3),
    ...shuffle(MBTI_POOL.TF).slice(0,3),
    ...shuffle(MBTI_POOL.JP).slice(0,3),
  ];
}

function scoreMBTI(ans, qs) {
  const s={E:0,I:0,S:0,N:0,T:0,F:0,J:0,P:0};
  qs.forEach(q=>{const o=q.o.find(o=>o.t===ans[q.id]);if(o)s[o.s]++;});
  return(s.E>=s.I?"E":"I")+(s.S>=s.N?"S":"N")+(s.T>=s.F?"T":"F")+(s.J>=s.P?"J":"P");
}

function buildSession() {
  // 10 anchors always + 10 drawn from optional pool = 20 total
  const optional=[...Q_POOL.energy,...Q_POOL.personality,...Q_POOL.work,...Q_POOL.money,...Q_POOL.motivations,...Q_POOL.wildcards,...Q_POOL.lifestyle,...Q_POOL.context];
  return [...shuffle(optional).slice(0,10),...Q_POOL.anchors];
}

// -- API -- sequential, retry on 429 -----------------------------------
async function callClaude(system, user, retries=2, maxTokens=1000) {
  try {
    const res=await fetch("https://api.anthropic.com/v1/messages",{
      method:"POST",
      headers:{"Content-Type":"application/json","anthropic-version":"2023-06-01","x-api-key":"anthropic-dangerous-direct-browser-access-key"},
      body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:maxTokens,system,messages:[{role:"user",content:user}]}),
    });
    if((res.status===429||res.status===529)&&retries>0){
      await new Promise(r=>setTimeout(r,res.status===529?6000:4000));
      return callClaude(system,user,retries-1,maxTokens);
    }
    if(!res.ok){const e=await res.text();return"[Error "+res.status+": "+e.slice(0,100)+"]";}
    let d;
    try{
      const txt=await res.text();
      if(!txt||txt.trim()===""){return"[Empty response from API]";}
      if(txt.trim().startsWith("<")){return"[API returned HTML - possible rate limit or proxy error]";}
      d=JSON.parse(txt);
    }catch(je){return"[Parse error: "+je.message.slice(0,60)+"]";}
    if(d?.content&&Array.isArray(d.content)){
      const tb=d.content.find(b=>b.type==="text");
      if(tb?.text)return tb.text;
      if(d.content[0]?.text)return d.content[0].text;
    }
    if(typeof d?.content==="string")return d.content;
    if(d?.text)return d.text;
    if(d?.completion)return d.completion;
    console.warn("Unexpected response shape:",JSON.stringify(d).slice(0,200));
    return"[No response]";
  }catch(e){
    console.warn("callClaude network error:",e.message);
    if(retries>0){await new Promise(r=>setTimeout(r,2000));return callClaude(system,user,retries-1,maxTokens);}
    return"[Connection error: "+e.message+"]";
  }
}

// Structured outputs -- forces valid JSON via tool_use, parse failures impossible
  async function callClaudeStructured(system, user, toolName, schema, retries=2) {
    try {
      const res=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",headers:{"Content-Type":"application/json","anthropic-version":"2023-06-01","x-api-key":"anthropic-dangerous-direct-browser-access-key"},
        body:JSON.stringify({
          model:"claude-sonnet-4-6",
          max_tokens:4000,
          system,
          tools:[{name:toolName,description:"Output for "+toolName,input_schema:schema}],
          tool_choice:{type:"tool",name:toolName},
          messages:[{role:"user",content:user}],
        }),
      });
      if((res.status===429||res.status===529)&&retries>0){
        await new Promise(r=>setTimeout(r,res.status===529?6000:4000));
        return callClaudeStructured(system,user,toolName,schema,retries-1);
      }
      if(!res.ok){console.warn("Structured API error:",res.status);return null;}
      let d;
      try{d=await res.json();}catch(je){return null;}
      if(d?.content&&Array.isArray(d.content)){
        const block=d.content.find(b=>b.type==="tool_use"&&b.name===toolName);
        if(block?.input)return block.input;
        // Fallback: try to parse any text block as JSON
        const tb=d.content.find(b=>b.type==="text");
        if(tb?.text){try{return JSON.parse(tb.text.split("\x60\x60\x60json").join("").split("\x60\x60\x60").join("").trim());}catch{}}
      }
      return null;
    }catch(e){
      console.warn("callClaudeStructured error:",e.message);
      if(retries>0){await new Promise(r=>setTimeout(r,2000));return callClaudeStructured(system,user,toolName,schema,retries-1);}
      return null;
    }
  }


// ==============================================================
// FEATURE 1 -- NARRATED LOADING SCREEN
// ==============================================================
function buildNarrationFromAnswers(answers, mbtiType) {
  const capital = answers.capital || "$5,000-$25,000";
  const loc = answers.location?.text || "your area";
  const steps = [];
  steps.push({ phase:"locating", headline:"Pinpointing "+loc, detail:"Mapping wealth concentrations, trust networks, and market gaps in your area.", icon:"[pin]", duration:4000 });
  const langs = answers.languages || "";
  if (langs && langs.toLowerCase() !== "english" && langs.length > 3) {
    steps.push({ phase:"languages", headline:"Linguistic moat detected", detail:langs.split(",")[0].trim()+" -- identifying communities where this gives you insider access others don't have.", icon:"[speak]", duration:4500 });
  } else {
    steps.push({ phase:"languages", headline:"Mapping your professional reputation", detail:"Identifying the authority you project and the trust you've already built.", icon:"[target]", duration:4000 });
  }
  const work = answers.work_hist || "";
  if (work.length > 20) {
    steps.push({ phase:"industries", headline:"Industry insider knowledge extracted", detail:"Finding the gaps that only someone who has worked inside this space can see.", icon:"[lab]", duration:4500 });
  }
  steps.push({ phase:"capital", headline:capital+" unlocks "+capital==="$100,000+"?"institutional":capital==="$25,000-$100,000"?"infrastructure":"knowledge-as-moat"+" plays", detail:"Filtering for ideas that match exactly what you can deploy right now.", icon:"[money]", duration:4000 });
  if (mbtiType) {
    const tr={ENTJ:"decisive systems thinking",ENTP:"contrarian innovation",ENFJ:"people-first leadership",ENFP:"movement building",INTJ:"strategic pattern recognition",INTP:"deep technical frameworks",INFJ:"mission-driven vision",INFP:"values-first creativity",ESTJ:"disciplined execution",ESFJ:"community trust building",ESTP:"fast adaptation",ESFP:"experiential magnetism",ISTJ:"reliable precision",ISFJ:"protective care",ISTP:"hands-on mastery",ISFP:"aesthetic authenticity"};
    steps.push({ phase:"mbti", headline:mbtiType+" -- "+tr[mbtiType]||"founder DNA"+" factored in", detail:"Matching idea types to how you naturally think, lead, and execute.", icon:"[brain]", duration:4000 });
  }
  steps.push({ phase:"trustgaps", headline:"Identifying trust gaps in your market", detail:"Finding underserved communities where an insider like you commands premium fees that outsiders simply cannot charge.", icon:"[hand]", duration:4500 });
  steps.push({ phase:"synthesis", headline:"Designing your unfair advantages", detail:"Combining all signals into hyper-specific ventures built around exactly who you are and where you are.", icon:"Z", duration:3500 });
  return steps;
}
function NarratedLoader({ answers, mbtiType }) {
  const steps = buildNarrationFromAnswers(answers, mbtiType);
  const [cur, setCur] = useState(0);
  const [prog, setProg] = useState(0);
  const sparks=[
    {l:"8%",t:"15%",s:3,bg:"#00d4c8",dur:"2.6s",del:"0s"},
    {l:"88%",t:"25%",s:4,bg:"#3b6ef8",dur:"3.1s",del:"0.4s"},
    {l:"15%",t:"70%",s:2,bg:"#00d4c8",dur:"2.4s",del:"0.9s"},
    {l:"80%",t:"65%",s:3,bg:"#5588ff",dur:"3.4s",del:"1.4s"},
    {l:"45%",t:"10%",s:4,bg:"#00d4c8",dur:"2.9s",del:"0.7s"},
    {l:"92%",t:"48%",s:2,bg:"#3b6ef8",dur:"3.2s",del:"1.1s"},
    {l:"5%",t:"50%",s:3,bg:"#00f0e0",dur:"2.7s",del:"0.3s"},
    {l:"55%",t:"85%",s:4,bg:"#3b6ef8",dur:"3.3s",del:"1.7s"},
    {l:"30%",t:"30%",s:2,bg:"#00d4c8",dur:"2.5s",del:"2.1s"},
    {l:"70%",t:"12%",s:3,bg:"#5588ff",dur:"2.8s",del:"0.6s"},
    {l:"20%",t:"88%",s:4,bg:"#3b6ef8",dur:"3.0s",del:"1.9s"},
    {l:"75%",t:"40%",s:2,bg:"#00f0e0",dur:"2.6s",del:"2.5s"},
    {l:"40%",t:"55%",s:3,bg:"#00d4c8",dur:"3.5s",del:"0.2s"},
    {l:"60%",t:"75%",s:4,bg:"#5588ff",dur:"2.7s",del:"1.3s"},
    {l:"25%",t:"45%",s:2,bg:"#3b6ef8",dur:"3.2s",del:"2.8s"},
  ];
  useEffect(() => {
    let i=0;
    const total=steps.reduce((s,st)=>s+st.duration,0);
    const startTime=Date.now();
    const intervalId=setInterval(()=>setProg(Math.min(((Date.now()-startTime)/total)*100,99)),80);
    function next(){
      if(i>=steps.length){clearInterval(intervalId);return;}
      setCur(i);
      setTimeout(()=>{i++;next();},steps[i].duration);
    }
    next();
    return ()=>clearInterval(intervalId);
  },[]);
  const step=steps[cur]||steps[steps.length-1];
  return(
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#060d1f,#0d1f4e)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:32,position:"relative",overflow:"hidden"}}>
      {sparks.map(function(sp,i){ return(
        <div key={i} style={{position:"absolute",left:sp.l,top:sp.t,width:sp.s,height:sp.s,background:sp.bg,borderRadius:"50%",animation:"arcSpark "+sp.dur+" linear "+sp.del+" infinite",opacity:0,pointerEvents:"none"}}/>
      ); })}
      {[220,300,370].map(function(r,i){ return(
        <div key={i} style={{position:"absolute",width:r,height:r,borderRadius:"50%",border:"1px solid rgba(59,130,246,"+(0.15-i*0.04)+")",animation:"arcRing "+(3.5+i*0.8)+"s ease-in-out "+(i*1.2)+"s infinite",pointerEvents:"none"}}/>
      ); })}
      <div style={{animation:"arcFloat 4.5s ease-in-out infinite",marginBottom:32,position:"relative",zIndex:2}}>
        <div style={{position:"relative",display:"inline-block"}}>
          <div style={{position:"absolute",inset:-28,borderRadius:"50%",background:"radial-gradient(circle,rgba(59,110,248,0.4) 0%,rgba(0,212,200,0.2) 45%,transparent 70%)",filter:"blur(16px)",animation:"arcRing 3s ease-in-out infinite"}}/>
          <img src={AIEON_LOGO_B64} alt="AieonLabs" style={{width:120,height:120,objectFit:"contain",position:"relative",zIndex:1,filter:"drop-shadow(0 0 14px rgba(59,110,248,0.95)) drop-shadow(0 0 30px rgba(0,212,200,0.7)) drop-shadow(0 0 50px rgba(59,110,248,0.45))"}}/>
        </div>
      </div>
      <div style={{fontSize:10,color:"#3b6ef8",letterSpacing:4,textTransform:"uppercase",fontFamily:"monospace",marginBottom:20,zIndex:2}}>Analyzing Your Profile</div>
      <div style={{maxWidth:480,width:"100%",zIndex:2}} key={step.phase}>
        <div style={{fontSize:11,color:"rgba(255,255,255,0.45)",marginBottom:8,letterSpacing:2,textTransform:"uppercase"}}>{step.phase}</div>
        <div style={{fontSize:22,fontWeight:700,color:"#fff",lineHeight:1.3,marginBottom:10,animation:"stepIn 0.4s ease"}}>{step.headline}</div>
        <div style={{fontSize:14,color:"rgba(255,255,255,0.55)",lineHeight:1.7,animation:"stepIn 0.4s ease"}}>{step.detail}</div>
        <div style={{marginTop:16,display:"flex",alignItems:"center",gap:6}}>
          <div style={{width:8,height:8,borderRadius:"50%",background:"#3b6ef8",animation:"blink 1.2s ease-in-out infinite"}}/>
          <span style={{fontSize:11,color:"rgba(255,255,255,0.5)",fontFamily:"monospace"}}>Step {cur+1} of {steps.length}</span>
        </div>
      </div>
      <div style={{width:"100%",maxWidth:400,marginTop:32,zIndex:2}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
          <span style={{fontSize:11,color:"rgba(255,255,255,0.5)"}}>Building your Idea Crucible</span>
          <span style={{fontSize:11,color:"rgba(255,255,255,0.45)",fontFamily:"monospace"}}>{Math.round(prog)}%</span>
        </div>
        <div style={{height:2,background:"rgba(255,255,255,0.06)",borderRadius:1,overflow:"hidden"}}>
          <div style={{height:"100%",width:prog+"%",background:"linear-gradient(90deg,#3b6ef8,#00d4c8)",borderRadius:1,transition:"width 0.3s ease"}}/>
        </div>
      </div>
      <div style={{marginTop:24,fontSize:11,color:"rgba(255,255,255,0.4)",zIndex:2}}>! AI suggestions -- not financial or legal advice</div>
    </div>
  );
}

// ==============================================================
// FEATURE 2 -- FOUNDER SCORE CARD
// ==============================================================
function scoreFounder(answers, mbtiType) {
  const sc=(val,map)=>{for(const[k,p]of Object.entries(map)){if(typeof val==="string"&&val.toLowerCase().includes(k.toLowerCase()))return p;}return 50;};
  const risk=sc(answers.risk||"",{"very low":10,"low":25,"medium":55,"high":80,"all in":95,"upside":65});
  const exec=sc(answers.hours||"",{"under 5":20,"5-15":40,"15-30":60,"30+":80,"full time":95});
  const rech=sc(answers.recharge||"",{"alone":20,"one or two":35,"larger group":75,"physical":50});
  const sell=sc(answers.selling||"",{"genuinely enjoy":90,"can do":55,"one-on-one":60,"avoid":15});
  const capEff=sc(answers.capital||"",{"under $1,000":98,"$1,000-$5,000":90,"$5,000-$25,000":75,"$25,000-$100,000":55,"$100,000":35});
  const netw=sc(answers.network||"",{"strong":90,"moderate":65,"thin":35,"non-existent":20});
  const idea=(answers.idea_hist&&answers.idea_hist.length>20)?75:40;
  let vis=50;
  if(mbtiType){const vt=["ENTP","ENFP","INTJ","INFJ","INFP","INTP","ENFJ","ENTJ"],ot=["ESTJ","ISTJ","ESFJ","ISFJ","ESTP","ISTP","ESFP","ISFP"];if(vt.includes(mbtiType))vis=78+Math.floor(Math.random()*12);else if(ot.includes(mbtiType))vis=28+Math.floor(Math.random()*18);}
  else{const s=[sc(answers.success||"",{"outlasts":80,"recognition":65,"difference":75,"freedom":55,"stability":35}),sc(answers.friends||"",{"creative":78,"ambitious":70,"reliable":35,"empathetic":55,"analytical":60}),sc(answers.legacy||"",{"world":82,"change":78,"known":65,"family":38,"stable":35})];const f=s.filter(v=>v!==50);vis=f.length>0?Math.round(f.reduce((a,b)=>a+b,0)/f.length):55;}
  const clamp=(v)=>Math.min(100,Math.max(5,v));
  return{riskAppetite:clamp(risk),executionSpeed:clamp(exec),peopleOriented:clamp(Math.round((rech+sell)/2)),capitalEfficiency:clamp(capEff),marketIntuition:clamp(Math.round((netw+idea)/2)),visionVsOps:clamp(vis)};
}
function deriveArchetype(s){
  const{riskAppetite:r,executionSpeed:e,peopleOriented:p,capitalEfficiency:c,marketIntuition:m,visionVsOps:v}=s;
  const A=[
    {cond:r>72&&e>70&&v>65,name:"The Visionary Builder",tag:"You see it before others. Then you build it.",color:"#7c3aed",emoji:"[rocket]"},
    {cond:p>75&&r>65&&m>65,name:"The Relationship Capitalist",tag:"Your network is your net worth.",color:"#dc2626",emoji:"[hand]"},
    {cond:c>75&&e>55&&p<48,name:"The Precision Operator",tag:"Ruthlessly efficient. Every dollar works twice.",color:"#0891b2",emoji:"@"},
    {cond:p>70&&m>60&&r<72,name:"The Community Anchor",tag:"You grow businesses through trust, not tactics.",color:"#059669",emoji:"[seed]"},
    {cond:r<40&&e>50,name:"The Steady Executor",tag:"Reliable, disciplined, built to outlast everyone.",color:"#1a56db",emoji:"[build]"},
    {cond:v>72&&r>55&&e<55,name:"The Strategic Architect",tag:"You design the game others play.",color:"#d97706",emoji:"#"},
    {cond:m>70&&v>60&&r>50,name:"The Market Whisperer",tag:"You spot the wave before anyone else paddles.",color:"#8b5cf6",emoji:"[wave]"},
    {cond:c>68&&r<45&&p<55,name:"The Lean Architect",tag:"More with less -- your superpower in any market.",color:"#0e7490",emoji:"[target]"},
    {cond:p>65&&v<48&&e>55,name:"The Master Operator",tag:"You make things run. That's the business.",color:"#be185d",emoji:"Z"},
    {cond:r>72&&e<45&&v>65,name:"The Visionary Dreamer",tag:"Big ideas need the right operator. Find them.",color:"#f59e0b",emoji:"[idea]"},
    {cond:r>30&&r<78&&e>30&&p>25,name:"The Adaptive Founder",tag:"Balanced and versatile -- dangerous in any terrain.",color:"#64748b",emoji:"[sync]"},
    {cond:true,name:"The Unconventional Builder",tag:"Your profile breaks the mold. Good.",color:"#6366f1",emoji:"[spin]"},
  ];
  return A.find(a=>a.cond);
}
const AXES=[{key:"riskAppetite",label:"Risk Appetite"},{key:"executionSpeed",label:"Execution Speed"},{key:"peopleOriented",label:"People Oriented"},{key:"capitalEfficiency",label:"Capital Efficiency"},{key:"marketIntuition",label:"Market Intuition"},{key:"visionVsOps",label:"Vision Strength"}];
function RadarChart({scores,color}){
  const[mounted,setMounted]=useState(false);
  useEffect(()=>{const t=setTimeout(()=>setMounted(true),50);return()=>clearTimeout(t);},[]);
  const cx=140,cy=140,R=100;
  const toRad=deg=>deg*Math.PI/180;
  const pt=(a,r)=>({x:cx+r*Math.cos(toRad(a)),y:cy+r*Math.sin(toRad(a))});
  const axisAngles=[-90,-30,30,90,150,210];

  // Pre-compute all ring polygons
  const rings=[20,40,60,80,100].map(r=>({r,pts:axisAngles.map(a=>pt(a,(r/100)*R)).map(p=>p.x+","+p.y).join(" ")}));

  // Pre-compute data polygon
  const dp=AXES.map((ax,i)=>{
    const val=mounted?(scores[ax.key]||50):0;
    return pt(axisAngles[i],(val/100)*R);
  });
  const poly=dp.map(d=>d.x+","+d.y).join(" ");

  // Pre-compute axis spokes
  const spokes=axisAngles.map((a,i)=>({i,x2:pt(a,R).x,y2:pt(a,R).y}));

  // Pre-compute label positions and alignment
  const labels=AXES.map((ax,i)=>{
    const lp=pt(axisAngles[i],R+26);
    const ang=axisAngles[i];
    let ta="middle";
    if(ang>=45&&ang<135) ta="start";
    else if(ang<=-135||ang>=135) ta="end";
    else if(ang<-45&&ang>-135) ta="end";
    return{key:ax.key,label:ax.label,x:lp.x,y:lp.y,ta,val:Math.round(scores[ax.key]||0)};
  });

  // Pre-compute dot positions
  const dots=dp.map((d,i)=>({i,cx:d.x,cy:d.y}));

  return(
    <svg width={280} height={280} viewBox="0 0 280 280" style={{overflow:"visible"}}>
      <defs>
        <radialGradient id="rg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3"/>
          <stop offset="100%" stopColor={color} stopOpacity="0.03"/>
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      {rings.map(ring=>(<polygon key={ring.r} points={ring.pts} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={1}/>))}
      {spokes.map(s=>(<line key={s.i} x1={cx} y1={cy} x2={s.x2} y2={s.y2} stroke="rgba(255,255,255,0.07)" strokeWidth={1}/>))}
      <polygon points={poly} fill="url(#rg)" stroke={color} strokeWidth={2} filter="url(#glow)" style={{transition:"all 1.2s ease"}}/>
      {dots.map(d=>(<circle key={d.i} cx={d.cx} cy={d.cy} r={4} fill={color} filter="url(#glow)" style={{transition:"all 1.2s ease"}}/>))}
      {labels.map(function(lb){ return(
        <g key={lb.key}>
          <text x={lb.x} y={lb.y-5} textAnchor={lb.ta} fontSize={8} fill="rgba(255,255,255,0.4)" fontFamily="system-ui">{lb.label.toUpperCase()}</text>
          <text x={lb.x} y={lb.y+9} textAnchor={lb.ta} fontSize={12} fontWeight={700} fill={color} fontFamily="system-ui">{lb.val}</text>
        </g>
      ); })}
    </svg>
  );
}

function FounderScoreCard({answers,mbtiType,onContinue}){
  const[showMbtiIntro,setShowMbtiIntro]=useState(!!mbtiType);
  const[mbtiStep,setMbtiStep]=useState(0);
  const[animStep,setAnimStep]=useState(0);
  const[revealed,setRevealed]=useState(false);
  const scores=scoreFounder(answers,mbtiType);
  const arch=deriveArchetype(scores);
  const mbtiT=mbtiType?MBTI_TYPES[mbtiType]:null;
  const overallScore=Math.round(Object.values(scores).reduce((s,v)=>s+v,0)/Object.keys(scores).length);
  const scoreTierLabel=overallScore>=80?"High Signal":overallScore>=65?"Well Rounded":overallScore>=50?"Balanced":"Early Stage";
  const scoreTierColor=overallScore>=80?"#10b981":overallScore>=65?"#3b6ef8":overallScore>=50?"#8b5cf6":"#94a3b8";
  const scoreTierDesc=overallScore>=80?"Strong clarity across most axes.":overallScore>=65?"Balanced strengths with room to sharpen.":overallScore>=50?"Solid foundation, a few areas to develop.":"Good start -- more clarity will come with action.";
  const axisRows=AXES.map((ax,i)=>({key:ax.key,label:ax.label,val:Math.round(scores[ax.key]||0),mb:i<AXES.length-1}));
  const sortedAxes=axisRows.slice().sort((a,b)=>b.val-a.val);
  const topAxis=sortedAxes[0];
  const lowAxis=sortedAxes[sortedAxes.length-1];

  const copyCard=()=>{
    const out=["AieonFounder -- Founder ScoreCard","Archetype: "+arch.name].concat(AXES.map(ax=>"  "+ax.label+": "+Math.round(scores[ax.key]||0))).join("\n");
    navigator.clipboard.writeText(out).catch(()=>{});
  };

  useEffect(()=>{
    if(showMbtiIntro){
      const t1=setTimeout(()=>setMbtiStep(1),300);
      const t2=setTimeout(()=>setMbtiStep(2),900);
      const t3=setTimeout(()=>setMbtiStep(3),1600);
      const t4=setTimeout(()=>setShowMbtiIntro(false),3200);
      return()=>{clearTimeout(t1);clearTimeout(t2);clearTimeout(t3);clearTimeout(t4);};
    }
  },[showMbtiIntro]);

  useEffect(()=>{
    if(!showMbtiIntro){
      const t1=setTimeout(()=>setAnimStep(1),500);
      const t2=setTimeout(()=>setAnimStep(2),1200);
      const t3=setTimeout(()=>setRevealed(true),2000);
      return()=>{clearTimeout(t1);clearTimeout(t2);clearTimeout(t3);};
    }
  },[showMbtiIntro]);

  const dims=mbtiType ? [
    {label:mbtiType[0]==="E"?"Extroverted":"Introverted",color:"#3b6ef8"},
    {label:mbtiType[1]==="N"?"Intuitive":"Sensing",color:"#8b5cf6"},
    {label:mbtiType[2]==="T"?"Thinking":"Feeling",color:"#0891b2"},
    {label:mbtiType[3]==="J"?"Judging":"Perceiving",color:"#059669"},
  ] : [];

  if(showMbtiIntro&&mbtiType&&mbtiT){
    return(
      <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#060d1f,#0d1f4e)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"24px",fontFamily:"system-ui,sans-serif",position:"relative",overflow:"hidden"}} onClick={()=>setShowMbtiIntro(false)}>
        {[{l:"8%",t:"15%",s:3,bg:"#00d4c8",dur:"2.6s",del:"0s"},{l:"88%",t:"25%",s:4,bg:"#3b6ef8",dur:"3.1s",del:"0.5s"},{l:"14%",t:"70%",s:2,bg:"#5588ff",dur:"2.4s",del:"1.0s"},{l:"82%",t:"66%",s:3,bg:"#00f0e0",dur:"3.3s",del:"1.5s"}].map(function(sp,i){ return(
          <div key={i} style={{position:"absolute",left:sp.l,top:sp.t,width:sp.s,height:sp.s,background:sp.bg,borderRadius:"50%",animation:"arcSpark "+sp.dur+" linear "+sp.del+" infinite",opacity:0,pointerEvents:"none"}}/>
        ); })}
        <div style={{textAlign:"center",maxWidth:480,width:"100%",position:"relative",zIndex:1}}>
          <div style={{fontSize:10,color:"#3b6ef8",letterSpacing:4,textTransform:"uppercase",fontFamily:"monospace",marginBottom:16,opacity:mbtiStep>=1?1:0,transition:"opacity 0.5s"}}>Your Founder Personality Type</div>
          <div style={{fontSize:"clamp(64px,14vw,100px)",fontWeight:900,color:"#fff",lineHeight:1,letterSpacing:"-2px",opacity:mbtiStep>=1?1:0,transition:"opacity 0.5s",filter:mbtiStep>=1?"drop-shadow(0 0 24px rgba(59,110,248,0.7))":"none",marginBottom:8}}>{mbtiType}</div>
          {mbtiStep>=2&&(
            <div style={{animation:"fadeUp 0.5s ease"}}>
              <div style={{fontSize:"clamp(18px,4vw,24px)",fontWeight:800,color:"#3b6ef8",marginBottom:6}}>{mbtiT.name}</div>
              <div style={{fontSize:14,color:"rgba(255,255,255,0.45)",fontStyle:"italic",marginBottom:20}}>"{mbtiT.tag}"</div>
              <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap",marginBottom:24}}>
                {dims.map(function(d,i){ return(
                  <div key={i} style={{background:d.color+"18",border:"1px solid "+d.color+"44",borderRadius:40,padding:"6px 14px"}}>
                    <div style={{fontSize:12,fontWeight:700,color:d.color}}>{d.label}</div>
                  </div>
                ); })}
              </div>
            </div>
          )}
          {mbtiStep>=3&&(
            <div style={{animation:"fadeUp 0.5s ease"}}>
              <div style={{fontSize:13,color:"rgba(255,255,255,0.5)",marginBottom:16}}>Generating your ScoreCard...</div>
              <div style={{width:120,height:2,background:"rgba(255,255,255,0.06)",borderRadius:1,margin:"0 auto",overflow:"hidden"}}>
                <div style={{height:"100%",width:"100%",background:"linear-gradient(90deg,#3b6ef8,#00d4c8)",borderRadius:1,animation:"scoreBar 1.5s ease forwards"}}/>
              </div>
            </div>
          )}
          <div style={{marginTop:24,fontSize:11,color:"rgba(255,255,255,0.5)"}}>Tap anywhere to skip</div>
        </div>
      </div>
    );
  }

  return(
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#060d1f,#0d1f4e)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"24px 16px",fontFamily:"system-ui,sans-serif",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,pointerEvents:"none"}}>
        {[{l:"6%",t:"14%",s:3,bg:"#00d4c8",dur:"2.6s",del:"0s"},{l:"90%",t:"20%",s:4,bg:"#3b6ef8",dur:"3.1s",del:"0.5s"},{l:"10%",t:"75%",s:2,bg:"#5588ff",dur:"2.4s",del:"1.0s"},{l:"85%",t:"70%",s:3,bg:"#00f0e0",dur:"3.3s",del:"1.5s"}].map(function(sp,i){ return(
          <div key={i} style={{position:"absolute",left:sp.l,top:sp.t,width:sp.s,height:sp.s,background:sp.bg,borderRadius:"50%",animation:"arcSpark "+sp.dur+" linear "+sp.del+" infinite",opacity:0}}/>
        ); })}
      </div>
      <div style={{maxWidth:640,width:"100%",animation:"cardIn 0.5s ease",position:"relative",zIndex:1}}>
        <div style={{textAlign:"center",marginBottom:24}}>
          <div style={{fontSize:10,color:"#3b6ef8",letterSpacing:4,textTransform:"uppercase",fontFamily:"monospace",marginBottom:8}}>Founder ScoreCard</div>
          <div style={{fontSize:"clamp(22px,5vw,30px)",fontWeight:900,color:"#fff",marginBottom:8}}>Your Founder Profile</div>
          {mbtiType&&mbtiT&&(
            <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:20,padding:"6px 14px"}}>
              <span style={{fontSize:12,color:"rgba(255,255,255,0.4)"}}>MBTI</span>
              <span style={{fontSize:13,fontWeight:700,color:"#fff"}}>{mbtiType}</span>
              <span style={{fontSize:11,color:"rgba(255,255,255,0.4)"}}>--</span>
              <span style={{fontSize:12,color:"rgba(255,255,255,0.55)"}}>{mbtiT.name}</span>
            </div>
          )}
        </div>
        <div style={{background:"linear-gradient(135deg,"+arch.color+"18,"+arch.color+"08)",border:"1.5px solid "+arch.color+"33",borderRadius:20,padding:"24px",marginBottom:16,textAlign:"center",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",inset:0,background:"radial-gradient(circle at 50% 0%,"+arch.color+"15,transparent 70%)",pointerEvents:"none"}}/>
          <div style={{animation:"arcFloat 4.5s ease-in-out infinite",display:"inline-block",marginBottom:10}}>
            <div style={{position:"relative",display:"inline-block"}}>
              <div style={{position:"absolute",inset:-16,borderRadius:"50%",background:"radial-gradient(circle,"+arch.color+"30,transparent 70%)"}}/>
              <img src={AIEON_LOGO_B64} alt="AieonLabs" style={{width:56,height:56,objectFit:"contain",position:"relative",filter:"drop-shadow(0 0 12px "+arch.color+"88)"}}/>
            </div>
          </div>
          <div style={{fontSize:10,color:arch.color,letterSpacing:3,textTransform:"uppercase",fontFamily:"monospace",marginBottom:4}}>{arch.tag}</div>
          <div style={{fontSize:"clamp(18px,4vw,24px)",fontWeight:900,color:"#fff",marginBottom:4}}>{arch.name}</div>
          <div style={{fontSize:13,color:"rgba(255,255,255,0.5)",fontStyle:"italic",marginBottom:12}}>"{arch.desc}"</div>
          {animStep>=2&&(
            <div style={{display:"inline-flex",flexDirection:"column",alignItems:"center",gap:3,background:"rgba(255,255,255,0.05)",borderRadius:12,padding:"8px 20px"}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontSize:13,fontWeight:800,color:scoreTierColor}}>{scoreTierLabel}</span>
                <span style={{fontSize:11,color:"rgba(255,255,255,0.4)"}}>--</span>
                <span style={{fontSize:12,color:"rgba(255,255,255,0.4)"}}>{overallScore}/100</span>
              </div>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.45)",fontStyle:"italic"}}>{scoreTierDesc}</div>
            </div>
          )}
        </div>
        <div style={{background:"rgba(255,255,255,0.03)",borderRadius:18,border:"1px solid rgba(255,255,255,0.07)",padding:"20px",marginBottom:16}}>
          <div style={{display:"flex",gap:16,alignItems:"flex-start",flexWrap:"wrap"}}>
            <div style={{flexShrink:0}}>
              <RadarChart scores={scores} color={arch.color} animated={true}/>
            </div>
            <div style={{flex:1,minWidth:160,paddingTop:4}}>
              {axisRows.map(function(row,idx){ return(
                <div key={row.key} style={{marginBottom:row.mb?10:0}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                    <span style={{fontSize:11,color:"rgba(255,255,255,0.55)",fontWeight:600}}>{row.label}</span>
                    <span style={{fontSize:12,fontWeight:800,color:animStep>=1?arch.color:"rgba(255,255,255,0.3)"}}>{row.val}</span>
                  </div>
                  <div style={{height:4,background:"rgba(255,255,255,0.06)",borderRadius:2,overflow:"hidden"}}>
                    <div style={{height:"100%",width:animStep>=1?row.val+"%":"0%",background:"linear-gradient(90deg,"+arch.color+","+arch.color+"88)",borderRadius:2,transition:"width 1s ease "+(idx*0.1)+"s"}}/>
                  </div>
                </div>
              ); })}
            </div>
          </div>
        </div>
        {revealed&&(
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
            <div style={{background:"rgba(5,150,105,0.1)",border:"1px solid rgba(5,150,105,0.25)",borderRadius:14,padding:"14px 16px"}}>
              <div style={{fontSize:10,color:"#10b981",fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:4}}>Top Strength</div>
              <div style={{fontSize:13,fontWeight:700,color:"#fff"}}>{topAxis.label}</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.4)",marginTop:2}}>{topAxis.val}/100</div>
            </div>
            <div style={{background:"rgba(245,158,11,0.08)",border:"1px solid rgba(245,158,11,0.2)",borderRadius:14,padding:"14px 16px"}}>
              <div style={{fontSize:10,color:"#f59e0b",fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:4}}>To Develop</div>
              <div style={{fontSize:13,fontWeight:700,color:"#fff"}}>{lowAxis.label}</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.4)",marginTop:2}}>{lowAxis.val}/100</div>
            </div>
          </div>
        )}
        <div style={{display:"flex",gap:10,marginBottom:14,flexWrap:"wrap"}}>
          <button onClick={copyCard} style={{padding:"10px 18px",borderRadius:10,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.7)",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Copy ScoreCard</button>
          <div style={{flex:1,fontSize:11,color:"rgba(255,255,255,0.4)",textAlign:"right",paddingTop:12}}>! AI assessment -- verify with a professional</div>
        </div>
        <button onClick={onContinue} style={{width:"100%",background:"linear-gradient(135deg,"+CL.blue+",#00d4c8)",color:"#fff",border:"none",borderRadius:14,padding:"16px",fontSize:16,fontWeight:800,cursor:"pointer",fontFamily:"inherit",letterSpacing:"-0.3px",boxShadow:"0 8px 32px rgba(26,86,219,0.4)"}}>
          Generate My Ideas ->
        </button>
        <div style={{textAlign:"center",marginTop:10,fontSize:11,color:"rgba(255,255,255,0.5)"}}>Your profile is saved for this session</div>
      </div>
    </div>
  </div>
  );
}
async function generateRoadmap(idea,profile){
  const sys="You are a startup advisor. Return ONLY a valid JSON object, no markdown. Structure: {headline:string,weeks:[{week:1,theme:string,focus:string,tasks:[string,string,string],quickWin:string,hardPart:string,milestone:string}],day30Goal:string,warningSign:string}. Exactly 4 weeks. No apostrophes.";
  const usr="30-day launch plan for: "+idea.title+". Location: "+(profile.location||"their area")+". Capital: "+(profile.capital||"limited")+". Background: "+(profile.background||"entrepreneurial")+". Week 1: zero-spend validation. Week 2: first moves. Week 3: first client. Week 4: iterate. JSON only.";
  try{
    const raw=await callClaude(sys,usr,2,2500);
    const cleaned=raw.trim().split("```json").join("").split("```").join("").replace(/^json/i,"").trim();
    const s=cleaned.indexOf("{"),e=cleaned.lastIndexOf("}");
    if(s===-1||e===-1)throw new Error("No JSON");
    const parsed=JSON.parse(cleaned.slice(s,e+1));
    if(parsed?.weeks?.length)return parsed;
  }catch(err){
    console.warn("Roadmap API failed, using fallback:",err);
  }
  // Fallback roadmap -- always shows something
  const capital=profile.capital||"$5,000";
  const loc=profile.location||"your area";
  return{
    headline:"Your first 30 days are about validation, not building. Talk to real people before spending a dollar.",
    day30Goal:"At least 3 people have told you they would pay for this, and you know exactly who your first client is.",
    warningSign:"If you have not had 5 real conversations with potential customers by end of week 2, stop and fix your outreach before proceeding.",
    weeks:[
      {week:1,theme:"Zero-Spend Validation",focus:"Prove the problem exists before solving it",tasks:["Identify 20 potential customers in "+loc+" you can contact this week","Have 5 real conversations -- ask about their pain, not your solution","Document every objection and every moment of genuine interest"],quickWin:"One person says they have this problem and would pay to solve it",hardPart:"Hearing no or polite disinterest without giving up",milestone:"10 conversations completed, pain confirmed by at least 3 people"},
      {week:2,theme:"First Real Moves",focus:"Build only what you need to start the conversation",tasks:["Create a one-page description of what you offer and who it is for","Identify your 3 most promising leads from week 1 conversations","Send a direct offer to those 3 leads -- not a pitch, a specific ask"],quickWin:"One person agrees to a follow-up or pilot conversation",hardPart:"Writing an offer before you feel ready",milestone:"At least one potential client is in active conversation with you"},
      {week:3,theme:"First Client",focus:"Close one paying engagement, even at a discount",tasks:["Present a specific scoped offer with a specific price to your best lead","Follow up every 2 days -- most deals close on the 4th to 6th contact","Deliver a small version of your service to build proof and confidence"],quickWin:"First dollar collected -- any amount",hardPart:"Naming your price out loud without flinching",milestone:"One paying client or signed agreement in hand"},
      {week:4,theme:"Iterate and Lock",focus:"Learn from your first client and sharpen the model",tasks:["Get detailed feedback from your first client on what worked and what did not","Identify what part of your offer took the most time for the least value","Start outreach to 5 more leads using everything you learned"],quickWin:"Client asks for a repeat engagement or refers someone",hardPart:"Resisting the urge to change everything based on one experience",milestone:"Clear picture of your repeatable offer and your ideal client profile"},
    ],
  };
}

const WK_COLORS=["#1a56db","#7c3aed","#059669","#d97706"];
const WK_LABELS=["Foundation","First Moves","First Client","Iterate & Lock"];
function ThirtyDayRoadmap({idea,roadmap}){
  const[exp,setExp]=useState(0);
  const[copied,setCopied]=useState(false);
  const WC=["#1a56db","#7c3aed","#059669","#d97706"];
  const WL=["Foundation","First Moves","First Client","Iterate & Lock"];

  const weeks=(roadmap.weeks||[]).map((w,i)=>{
    const color=WC[i]||"#1a56db";
    return{
      w, i, color,
      label: WL[i]||("Week "+w.week),
      tasks: (w.tasks||[]).map((t,ti)=>({t,ti,color})),
    };
  });

  const copy=()=>{
    const lines=["AieonFounder -- First 30 Days","=".repeat(36),"Idea: "+idea.title,"",roadmap.headline||""];
    weeks.forEach(({w,label})=>{
      lines.push("WEEK "+w.week+": "+w.theme,"Focus: "+w.focus,"Milestone: "+w.milestone);
      (w.tasks||[]).forEach((t,idx)=>lines.push("  "+(idx+1)+". "+t));
      lines.push("Quick Win: "+w.quickWin,"Hard Part: "+w.hardPart,"");
    });
    lines.push("Day 30: "+(roadmap.day30Goal||""),"Watch for: "+(roadmap.warningSign||""),"","AI-generated. AieonFounder by AieonLabs");
    navigator.clipboard.writeText(lines.join("\n")).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2000);}).catch(()=>{});
  };

  return(
    <div style={{marginTop:24,fontFamily:"system-ui,sans-serif"}}>
      <div style={{background:"linear-gradient(135deg,#0d1f4e,#152663)",borderRadius:18,padding:24,marginBottom:12,border:"1px solid #e2e8f0"}}>
        <div style={{fontSize:10,color:"#93c5fd",letterSpacing:3,textTransform:"uppercase",fontFamily:"monospace",marginBottom:8}}>AieonFounder * First 30 Days</div>
        <div style={{fontSize:18,fontWeight:800,color:"#fff",marginBottom:6}}>{idea.title}</div>
        <div style={{fontSize:13,color:"rgba(255,255,255,0.6)",marginBottom:16,lineHeight:1.6}}>{roadmap.headline}</div>
        <div style={{padding:"10px 14px",borderRadius:10,background:"rgba(59,130,246,0.2)",border:"1px solid rgba(59,130,246,0.4)"}}>
          <div style={{fontSize:9,color:"#93c5fd",fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:4}}>Day 30 Goal</div>
          <div style={{fontSize:13,color:"#fff",fontWeight:600}}>{roadmap.day30Goal}</div>
        </div>
      </div>
      {weeks.map(function({w,i,color,label,tasks}){ return(
        <WeekCard key={w.week} w={w} i={i} color={color} label={label} tasks={tasks} exp={exp} setExp={setExp}/>
      ); })}
      {roadmap.warningSign&&(
        <div style={{padding:"12px 16px",borderRadius:12,background:"#fffbeb",border:"1px solid #fde68a",marginBottom:12,display:"flex",gap:10,alignItems:"flex-start"}}>
          <span style={{fontSize:16,flexShrink:0}}>[alert]</span>
          <div>
            <div style={{fontSize:9,color:"#92400e",fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:4}}>Warning Sign</div>
            <div style={{fontSize:12,color:"#78350f",lineHeight:1.6}}>{roadmap.warningSign}</div>
          </div>
        </div>
      )}
      <button onClick={copy} style={{padding:"9px 18px",borderRadius:10,background:"#f1f5f9",border:"1px solid #e2e8f0",color:"#334155",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>{copied?"Copied!":"Copy Roadmap"}</button>
    </div>
  );
}
function WeekCard({w,i,color,label,tasks,exp,setExp}){
  const open=exp===i;
  const borderStyle="1.5px solid "+(open?color:"#e2e8f0");
  const bgStyle=open?"#fafbff":"#fff";
  const btnBg=open?"#f5f5ff":"#fff";
  const mileBg=color+"10";
  const mileBorder=color+"30";
  return(
    <div style={{borderRadius:14,border:borderStyle,overflow:"hidden",marginBottom:8,background:bgStyle,transition:"all 0.3s"}}>
      <button onClick={()=>setExp(open?-1:i)} style={{width:"100%",textAlign:"left",padding:"14px 18px",background:btnBg,border:"none",cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:12}}>
        <div style={{width:38,height:38,borderRadius:12,background:color,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
          <span style={{fontSize:14,fontWeight:900,color:"#fff"}}>{w.week}</span>
        </div>
        <div style={{flex:1}}>
          <div style={{fontSize:10,color:color,fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:2}}>{label}</div>
          <div style={{fontSize:14,fontWeight:700,color:"#0f172a"}}>{w.theme}</div>
          <div style={{fontSize:11,color:"#64748b",marginTop:1}}>{w.focus}</div>
        </div>
        <span style={{color:"#94a3b8",fontSize:14}}>{open?"^":"v"}</span>
      </button>
      {open&&(
        <div style={{padding:"0 18px 18px",background:"#fafbff"}}>
          <div style={{padding:"8px 12px",borderRadius:8,background:mileBg,border:"1px solid "+mileBorder,marginBottom:12}}>
            <span style={{fontSize:9,color:color,fontWeight:700,letterSpacing:1,textTransform:"uppercase"}}>Milestone -- </span>
            <span style={{fontSize:12,color:"#0f172a",fontWeight:600}}>{w.milestone}</span>
          </div>
          {tasks.map(function({t,ti,color:tc}){ return(
            <div key={ti} style={{display:"flex",gap:8,marginBottom:8,alignItems:"flex-start"}}>
              <div style={{width:20,height:20,borderRadius:5,background:tc+"15",border:"1px solid "+tc+"40",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:tc,fontWeight:700,flexShrink:0,marginTop:1}}>{ti+1}</div>
              <div style={{fontSize:13,color:"#334155",lineHeight:1.6}}>{t}</div>
            </div>
          ); })}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:4}}>
            <div style={{padding:"10px 12px",borderRadius:8,background:"#f0fdf4",border:"1px solid #86efac"}}>
              <div style={{fontSize:9,color:"#166534",fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:4}}>Quick Win</div>
              <div style={{fontSize:11,color:"#166534",lineHeight:1.5}}>{w.quickWin}</div>
            </div>
            <div style={{padding:"10px 12px",borderRadius:8,background:"#fef2f2",border:"1px solid #fca5a5"}}>
              <div style={{fontSize:9,color:"#991b1b",fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:4}}>Hard Part</div>
              <div style={{fontSize:11,color:"#991b1b",lineHeight:1.5}}>{w.hardPart}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function tagIdea(idea){
  const t=((idea.title||"")+" "+(idea.concept||"")).toLowerCase();
  const tags=[];
  if(t.includes("ai")||t.includes("tech")||t.includes("software")||t.includes("app"))tags.push("tech");
  if(t.includes("b2b")||t.includes("business")||t.includes("enterprise")||t.includes("firm"))tags.push("B2B");
  if(t.includes("consult")||t.includes("audit")||t.includes("advisor")||t.includes("service"))tags.push("service");
  if(t.includes("trust")||t.includes("secure")||t.includes("complian"))tags.push("trust");
  if(t.includes("franchise")||t.includes("brick")||t.includes("physical")||t.includes("location"))tags.push("physical");
  if(t.includes("community")||t.includes("immigrant")||t.includes("bilingual")||t.includes("cultural"))tags.push("community");
  if(t.includes("saas")||t.includes("platform")||t.includes("product")||t.includes("white-label"))tags.push("product");
  if(t.includes("local")||t.includes("jersey")||t.includes("borough")||t.includes("neighborhood"))tags.push("local");
  if(tags.length===0)tags.push("consulting");
  return tags;
}
const TAG_LABELS={tech:{label:"Technology-driven"},B2B:{label:"Business clients"},service:{label:"Service-based"},trust:{label:"Trust-centric"},product:{label:"Product-led"},community:{label:"Community access"},physical:{label:"Physical presence"},local:{label:"Hyper-local"},consulting:{label:"Consulting model"}};
function deriveInsightsHeatmap(ideas,reactions){
  const ex=Object.entries(reactions).filter(([,v])=>v==="excited").map(([k])=>k);
  const pa=Object.entries(reactions).filter(([,v])=>v==="no").map(([k])=>k);
  const tally=(ids)=>{const t={};ids.forEach(id=>{const idea=ideas.find(i=>i.id===id);(tagIdea(idea)||[]).forEach(tag=>{t[tag]=(t[tag]||0)+1;});});return t;};
  const et=tally(ex),pt=tally(pa);
  const insights=[];
  if((et.product||0)>(et.service||0))insights.push({icon:"[box]",label:"You want to build, not just deliver",detail:"Product ideas excited you more than service delivery. You want leverage beyond your time."});
  else if((et.service||0)>0)insights.push({icon:"[hand]",label:"You lead with expertise",detail:"Service and trust-based ideas resonated most. You want to sell what you know."});
  if((et.local||0)>0&&(et.local||0)>=(et.product||0))insights.push({icon:"[pin]",label:"You are betting on local roots",detail:"Hyper-local ideas resonated. Your moat is who you know and where you are."});
  if((et.trust||0)>=2)insights.push({icon:"[secure]",label:"Trust is your competitive strategy",detail:"Multiple ideas you loved only work when people trust who delivers them."});
  if((pt.physical||0)>(et.physical||0))insights.push({icon:"[pc]",label:"You prefer digital-first",detail:"You passed on physical presence ideas. You see leverage in tools that work while you sleep."});
  return insights.slice(0,3);
}
function ReactionHeatmap({ideas,reactions}){
  const tagged=ideas.map(i=>({...i,tags:tagIdea(i)}));
  const tagTally={};
  tagged.forEach(idea=>{const r=reactions[idea.id];if(!r)return;idea.tags.forEach(tag=>{if(!tagTally[tag])tagTally[tag]={excited:0,passed:0};tagTally[tag][r==="excited"?"excited":"passed"]++;});});
  const sorted=Object.entries(tagTally).sort((a,b)=>(b[1].excited-b[1].passed)-(a[1].excited-a[1].passed));
  const insights=deriveInsightsHeatmap(ideas,reactions);
  const excited=Object.values(reactions).filter(v=>v==="excited").length;
  const passed=Object.values(reactions).filter(v=>v==="no").length;
  const unsure=Object.values(reactions).filter(v=>v==="unsure").length;
  return(
    <div style={{marginTop:16,fontFamily:"system-ui,sans-serif"}}>
      <div style={{background:"#0d1f4e",borderRadius:16,padding:20,marginBottom:10,border:"1px solid #e2e8f0"}}>
        <div style={{fontSize:10,color:"#93c5fd",letterSpacing:3,textTransform:"uppercase",fontFamily:"monospace",marginBottom:8}}>Reaction Analysis</div>
        <div style={{fontSize:16,fontWeight:800,color:"#fff",marginBottom:4}}>What your gut is telling you</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,0.5)",marginBottom:14}}>Based on {Object.keys(reactions).length} reactions</div>
        <div style={{display:"flex",gap:10}}>
          {[{l:"Excited",n:excited,c:"#10b981",e:"[fire]"},{l:"Unsure",n:unsure,c:"#f59e0b",e:"[think]"},{l:"Passed",n:passed,c:"#ef4444",e:"X"}].map(function(s){ return(
            <div key={s.l} style={{flex:1,padding:"10px",borderRadius:10,background:"rgba(255,255,255,0.08)",textAlign:"center"}}>
              <div style={{fontSize:14}}>{s.e}</div>
              <div style={{fontSize:18,fontWeight:900,color:s.c}}>{s.n}</div>
              <div style={{fontSize:10,color:"rgba(255,255,255,0.5)"}}>{s.l}</div>
            </div>
          ); })}
        </div>
      </div>
      <div style={{background:"#f8fafc",borderRadius:14,border:"1px solid #e2e8f0",padding:16,marginBottom:10}}>
        <div style={{fontSize:10,color:"#64748b",fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>Pattern Map</div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {sorted.map(([tag,counts])=>{
            const net=counts.excited-counts.passed;
            const color=net>0?"#059669":net<0?"#dc2626":"#64748b";
            const bg=net>0?"#f0fdf4":net<0?"#fef2f2":"#f8fafc";
            const border=net>0?"#86efac":net<0?"#fca5a5":"#e2e8f0";
            if(!TAG_LABELS[tag])return null;
            return(<div key={tag} style={{padding:"4px 12px",borderRadius:20,background:bg,border:"1.5px solid "+border,fontSize:11,color,fontWeight:700}}>{net>0?"^":net<0?"v":"--"} {TAG_LABELS[tag].label}</div>);
          })}
        </div>
      </div>
      {insights.length>0&&<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:8}}>
        {insights.map(function(ins,i){ return(
          <div key={i} style={{padding:"12px 14px",borderRadius:12,background:"#fff",border:"1px solid #e2e8f0"}}>
            <div style={{fontSize:18,marginBottom:4}}>{ins.icon}</div>
            <div style={{fontSize:13,fontWeight:700,color:"#0f172a",marginBottom:3}}>{ins.label}</div>
            <div style={{fontSize:11,color:"#64748b",lineHeight:1.6}}>{ins.detail}</div>
          </div>
        ); })}
      </div>}
    </div>
  );
}

async function generateBlindspots(idea,profile){
  const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","anthropic-version":"2023-06-01","x-api-key":"anthropic-dangerous-direct-browser-access-key"},body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:2000,system:"You are a competitive intelligence analyst. Respond with ONLY a valid JSON object -- no markdown, just raw JSON. Structure: {\"market\":\"string\",\"blindspots\":[{\"id\":1,\"complaint\":\"string\",\"evidence\":\"string\",\"opportunity\":\"string\",\"pitchLine\":\"string\"}],\"moatSummary\":\"string\"} Generate exactly 3 blindspot objects. No apostrophes in contractions.",messages:[{role:"user",content:"Competitive blindspots for: "+idea.title+". Concept: "+(idea.concept||idea.title)+". Location: "+(profile.location||"US")+". Background: "+(profile.background||"entrepreneurial")+". Find 3 real competitor failures and how this founder exploits them. JSON only."}]})});
  if(!res.ok)throw new Error("API "+res.status);
  const d=await res.json();
  let raw=(d.content?.[0]?.text||"").trim().split("```json").join("").split("```").join("").replace(/^json/i,"").trim();
  const s=raw.indexOf("{"),e=raw.lastIndexOf("}");
  if(s!==-1&&e!==-1)raw=raw.slice(s,e+1);
  const p=JSON.parse(raw);
  if(!p?.blindspots?.length)throw new Error("No blindspots returned");
  return p;
}
function BlindspotReport({idea,report}){
  const[exp,setExp]=useState(0);
  const[copied,setCopied]=useState(false);
  const COLORS=["#dc2626","#d97706","#7c3aed"];
  const EMOJIS=["[red]","[yellow]","[purple]"];
  const copy=()=>{
    const txt=["AieonFounder -- Competitive Blindspot Report","=".repeat(36),"Market: "+(report.market||""),"",...(report.blindspots||[]).flatMap((b,i)=>["#"+(i+1)+": "+b.complaint,"Evidence: "+b.evidence,"Opportunity: "+b.opportunity,"Pitch: "+b.pitchLine,""]),"Moat: "+(report.moatSummary||""),"","AI-generated. AieonFounder by AieonLabs"].join("\n");
    navigator.clipboard.writeText(txt).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2000);}).catch(()=>{});
  };
  return(
    <div style={{marginTop:24,fontFamily:"system-ui,sans-serif"}}>
      <div style={{background:"linear-gradient(135deg,#1a0a2e,#2d1b69)",borderRadius:18,padding:24,marginBottom:12,border:"1px solid #e2e8f0"}}>
        <div style={{fontSize:10,color:"#c4b5fd",letterSpacing:3,textTransform:"uppercase",fontFamily:"monospace",marginBottom:8}}>AieonFounder * Competitive Intelligence</div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12,flexWrap:"wrap",marginBottom:14}}>
          <div>
            <div style={{fontSize:18,fontWeight:800,color:"#fff"}}>Blindspot Report</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,0.5)"}}>Market: <span style={{color:"#c4b5fd"}}>{report.market}</span></div>
          </div>
          <div style={{padding:"8px 14px",borderRadius:10,background:"rgba(124,58,237,0.2)",border:"1px solid rgba(124,58,237,0.4)",textAlign:"center"}}>
            <div style={{fontSize:10,color:"#c4b5fd",fontWeight:700,textTransform:"uppercase"}}>Gaps found</div>
            <div style={{fontSize:22,fontWeight:900,color:"#fff"}}>{(report.blindspots||[]).length}</div>
          </div>
        </div>
        <div style={{padding:"10px 14px",borderRadius:10,background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)"}}>
          <div style={{fontSize:9,color:"rgba(255,255,255,0.5)",fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:4}}>Your competitive white space</div>
          <div style={{fontSize:13,color:"#fff",fontWeight:600,lineHeight:1.5}}>{report.moatSummary}</div>
        </div>
      </div>
      {(report.blindspots||[]).map((b,i)=>{
        const color=COLORS[i]||"#1a56db";
        const open=exp===i;
        const borderCol=open?color:"#e2e8f0";
        const bgCol=open?"#fafbff":"#fff";
        const btnBg=open?"#f5f5ff":"#fff";
        const oppBg=i===0?"#fef2f2":i===1?"#fffbeb":"#f5f3ff";
        const oppBorder=i===0?"#fca5a5":i===1?"#fde68a":"#ddd6fe";
        return(
          <div key={b.id||i} style={{borderRadius:14,border:"1.5px solid "+borderCol,overflow:"hidden",marginBottom:8,background:bgCol,transition:"all 0.3s"}}>
            <button onClick={()=>setExp(open?-1:i)} style={{width:"100%",textAlign:"left",padding:"16px 18px",background:btnBg,border:"none",cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"flex-start",gap:12}}>
              <span style={{fontSize:20,flexShrink:0}}>{EMOJIS[i]||"[blue]"}</span>
              <div style={{flex:1}}>
                <div style={{fontSize:9,color:color,fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:3}}>{"Blindspot #"+(i+1)}</div>
                <div style={{fontSize:14,fontWeight:700,color:"#0f172a",lineHeight:1.3}}>{b.complaint}</div>
              </div>
              <span style={{color:"#94a3b8",fontSize:12,marginTop:2}}>{open?"^":"v"}</span>
            </button>
            {open&&(
              <div style={{padding:"0 18px 18px",background:"#fafbff"}}>
                <div style={{padding:"10px 14px",borderRadius:8,background:"#f8fafc",border:"1px solid #e2e8f0",marginBottom:10}}>
                  <div style={{fontSize:9,color:"#64748b",fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:4}}>Why this is real</div>
                  <div style={{fontSize:12,color:"#334155",lineHeight:1.7}}>{b.evidence}</div>
                </div>
                <div style={{padding:"10px 14px",borderRadius:8,background:oppBg,border:"1px solid "+oppBorder,marginBottom:10}}>
                  <div style={{fontSize:9,color:color,fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:4}}>Your opportunity</div>
                  <div style={{fontSize:12,color:"#334155",lineHeight:1.7}}>{b.opportunity}</div>
                </div>
                <div style={{padding:"12px 14px",borderRadius:8,background:"#f8fafc",border:"1px solid #e2e8f0"}}>
                  <div style={{fontSize:9,color:"#64748b",fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>What you say that lands differently</div>
                  <div style={{fontSize:13,color:"#0f172a",fontWeight:600,lineHeight:1.6,fontStyle:"italic"}}>"{b.pitchLine}"</div>
                </div>
              </div>
            )}
          </div>
        );
      })}
      <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap",marginTop:8}}>
        <button onClick={copy} style={{padding:"9px 18px",borderRadius:10,background:"#f1f5f9",border:"1px solid #e2e8f0",color:"#334155",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>{copied?"Copied!":"Copy Report"}</button>
        <div style={{flex:1,textAlign:"right",fontSize:11,color:"#94a3b8"}}>AI-generated analysis only</div>
      </div>
    </div>
  );
}

function LoadingAnimation({advisorTexts,loadingMap,lockedIdea}){
  const done=Object.keys(advisorTexts).length;
  const total=ADVISORS.length;
  const pct=Math.round((done/total)*100);
  const currentAdvisor=ADVISORS.find(a=>loadingMap[a.id]);
  const sparks=[
    {l:"6%",t:"12%",s:3,bg:"#00d4c8",dur:"2.6s",del:"0s"},
    {l:"90%",t:"22%",s:4,bg:"#3b6ef8",dur:"3.1s",del:"0.5s"},
    {l:"12%",t:"72%",s:2,bg:"#5588ff",dur:"2.4s",del:"1.0s"},
    {l:"82%",t:"68%",s:3,bg:"#00f0e0",dur:"3.3s",del:"1.5s"},
    {l:"48%",t:"8%",s:4,bg:"#00d4c8",dur:"2.9s",del:"0.8s"},
    {l:"94%",t:"50%",s:2,bg:"#3b6ef8",dur:"3.2s",del:"1.2s"},
    {l:"4%",t:"52%",s:3,bg:"#00d4c8",dur:"2.7s",del:"0.3s"},
    {l:"58%",t:"88%",s:4,bg:"#5588ff",dur:"3.4s",del:"1.8s"},
    {l:"28%",t:"28%",s:2,bg:"#3b6ef8",dur:"2.5s",del:"2.2s"},
    {l:"72%",t:"14%",s:3,bg:"#00d4c8",dur:"2.8s",del:"0.6s"},
    {l:"35%",t:"82%",s:4,bg:"#3b6ef8",dur:"3.0s",del:"2.0s"},
    {l:"78%",t:"42%",s:2,bg:"#00f0e0",dur:"2.6s",del:"2.6s"},
    {l:"42%",t:"58%",s:3,bg:"#5588ff",dur:"3.5s",del:"0.2s"},
    {l:"18%",t:"92%",s:4,bg:"#00d4c8",dur:"2.7s",del:"1.4s"},
    {l:"65%",t:"35%",s:2,bg:"#3b6ef8",dur:"3.1s",del:"2.9s"},
  ];
  const MSGS={
    cfo:["Reviewing your unit economics and burn rate...","Stress-testing your capital allocation...","Modeling your first 90-day financial survival..."],
    cmo:["Mapping your first customer acquisition path...","Identifying your strongest growth channel...","Profiling your ideal first-paying customer..."],
    legal:["Assessing your legal exposure and structure...","Reviewing compliance requirements for your market...","Flagging the risks that kill early-stage businesses..."],
    vc:["Evaluating your fundability and market size...","Modeling your path to institutional investment...","Identifying your unfair advantages..."],
    devil:["Building the case against your idea...","Finding the assumptions you haven't questioned...","Preparing your hardest questions..."],
  };
  const [msgIdx,setMsgIdx]=useState(0);
  useEffect(()=>{
    const t=setInterval(()=>setMsgIdx(m=>(m+1)%3),2800);
    return ()=>clearInterval(t);
  },[currentAdvisor?.id]);
  const currentMsg=currentAdvisor?MSGS[currentAdvisor.id]?.[msgIdx]:"Preparing your Board session..."
  return(
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#060d1f,#0d1f4e)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:32,position:"relative",overflow:"hidden"}}>
      {sparks.map(function(sp,i){ return(
        <div key={i} style={{position:"absolute",left:sp.l,top:sp.t,width:sp.s,height:sp.s,background:sp.bg,borderRadius:"50%",animation:"arcSpark "+sp.dur+" linear "+sp.del+" infinite",opacity:0,pointerEvents:"none"}}/>
      ); })}
      {[200,280,350].map(function(r,i){ return(
        <div key={i} style={{position:"absolute",width:r,height:r,borderRadius:"50%",border:"1px solid rgba(59,130,246,"+(0.15-i*0.04)+")",animation:"arcRing "+(3.5+i*0.8)+"s ease-in-out "+(i*1.3)+"s infinite",pointerEvents:"none"}}/>
      ); })}
      <div style={{animation:"arcFloat 4.5s ease-in-out infinite",marginBottom:28,position:"relative",zIndex:2}}>
        <div style={{position:"relative",display:"inline-block"}}>
          <div style={{position:"absolute",inset:-28,borderRadius:"50%",background:"radial-gradient(circle,rgba(59,110,248,0.4) 0%,rgba(0,212,200,0.2) 45%,transparent 70%)",filter:"blur(16px)"}}/>
          <img src={AIEON_LOGO_B64} alt="AieonLabs" style={{width:120,height:120,objectFit:"contain",position:"relative",zIndex:1,filter:"drop-shadow(0 0 14px rgba(59,110,248,0.95)) drop-shadow(0 0 30px rgba(0,212,200,0.7)) drop-shadow(0 0 50px rgba(59,110,248,0.45))"}}/>
        </div>
      </div>
      <div style={{fontSize:10,color:"#3b6ef8",letterSpacing:4,textTransform:"uppercase",fontFamily:"monospace",marginBottom:8,zIndex:2}}>Board Session In Progress</div>
      <div style={{fontSize:15,color:"rgba(255,255,255,0.5)",marginBottom:4,zIndex:2,maxWidth:360,textAlign:"center"}}>
        {lockedIdea?.title&&<span style={{color:"rgba(255,255,255,0.8)",fontWeight:700}}>{lockedIdea.title}</span>}
      </div>
      <div style={{height:40,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:24,zIndex:2}}>
        {currentAdvisor?(
          <div style={{display:"flex",alignItems:"center",gap:10,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:40,padding:"8px 20px"}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:currentAdvisor.color,animation:"blink 1s ease-in-out infinite"}}/>
            <span style={{fontSize:13,color:"rgba(255,255,255,0.7)",fontStyle:"italic",animation:"stepIn 0.4s ease"}}>{currentMsg}</span>
          </div>
        ):(
          <div style={{fontSize:13,color:"rgba(255,255,255,0.45)",fontStyle:"italic"}}>Initializing your Board...</div>
        )}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8,width:"100%",maxWidth:340,zIndex:2,marginBottom:24}}>
        {ADVISORS.map(adv=>{
          const isDone=!!advisorTexts[adv.id];
          const isActive=!!loadingMap[adv.id];
          return(
            <div key={adv.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 14px",borderRadius:10,background:isDone?"rgba(5,150,105,0.12)":isActive?"rgba(59,130,246,0.1)":"rgba(255,255,255,0.03)",border:"1px solid "+(isDone?"rgba(5,150,105,0.3)":isActive?adv.color+"44":"rgba(255,255,255,0.06)"),transition:"all 0.4s"}}>
              <span style={{fontSize:16}}>{adv.emoji}</span>
              <span style={{flex:1,fontSize:12,color:isDone?"rgba(255,255,255,0.8)":isActive?"rgba(255,255,255,0.7)":"rgba(255,255,255,0.25)",fontWeight:isDone||isActive?600:400}}>{adv.title}</span>
              <span style={{fontSize:12}}>{isDone?"OK":isActive?"~":"o"}</span>
            </div>
          );
        })}
      </div>
      <div style={{width:"100%",maxWidth:340,zIndex:2}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
          <span style={{fontSize:11,color:"rgba(255,255,255,0.5)"}}>{done} of {total} advisors complete</span>
          <span style={{fontSize:11,color:"rgba(255,255,255,0.45)",fontFamily:"monospace"}}>{pct}%</span>
        </div>
        <div style={{height:3,background:"rgba(255,255,255,0.06)",borderRadius:2,overflow:"hidden"}}>
          <div style={{height:"100%",width:pct+"%",background:"linear-gradient(90deg,#3b6ef8,#00d4c8)",borderRadius:2,transition:"width 0.8s ease"}}/>
        </div>
      </div>
    </div>
  );
}

// -- Module-level UI components ----------------------------------------
function BannerSparks(){
  const s=[
    {l:"5%",t:"20%",sz:2,bg:"#3b6ef8",dur:"2.8s",del:"0s"},
    {l:"88%",t:"60%",sz:2,bg:"#00d4c8",dur:"3.2s",del:"0.6s"},
    {l:"15%",t:"70%",sz:2,bg:"#5588ff",dur:"2.5s",del:"1.1s"},
    {l:"75%",t:"25%",sz:2,bg:"#00d4c8",dur:"3.0s",del:"0.3s"},
    {l:"45%",t:"80%",sz:1,bg:"#3b6ef8",dur:"2.7s",del:"1.8s"},
    {l:"92%",t:"40%",sz:2,bg:"#00f0e0",dur:"3.4s",del:"0.9s"},
    {l:"30%",t:"15%",sz:1,bg:"#3b6ef8",dur:"2.9s",del:"2.2s"},
    {l:"60%",t:"65%",sz:2,bg:"#5588ff",dur:"3.1s",del:"0.4s"},
    {l:"20%",t:"45%",sz:1,bg:"#00d4c8",dur:"2.6s",del:"1.5s"},
    {l:"70%",t:"10%",sz:2,bg:"#3b6ef8",dur:"3.3s",del:"2.7s"},
  ];
  return(
    <div style={{position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden"}}>
      {s.map(function(sp,i){ return(
        <div key={i} style={{position:"absolute",left:sp.l,top:sp.t,width:sp.sz,height:sp.sz,background:sp.bg,borderRadius:"50%",animation:"arcSpark "+sp.dur+" linear "+sp.del+" infinite",opacity:0}}/>
      ); })}
    </div>
  );
}

function Banner(){
  return(
    <div style={{position:"relative",background:"linear-gradient(135deg,#080f2b,#0d1f4e)",borderBottom:"1px solid rgba(59,130,246,0.2)",padding:"10px 16px",overflow:"hidden",flexShrink:0}}>
      <BannerSparks/>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,position:"relative",zIndex:1}}>
        <img src={AIEON_LOGO_B64} alt="AieonLabs" style={{width:22,height:22,objectFit:"contain",filter:"drop-shadow(0 0 6px rgba(59,110,248,0.9)) drop-shadow(0 0 12px rgba(0,212,200,0.6))"}}/>
        <span style={{fontSize:11,color:"rgba(255,255,255,0.45)",letterSpacing:"0.3px"}}>AieonFounder * AI-generated content -- not legal, financial, or professional advice</span>
      </div>
    </div>
  );
}

function McInput({q,value,onChange}){
  const[other,setOther]=useState("");
  const[showOther,setShowOther]=useState(false);
  const sel=value?.startsWith?.("__other__:")?"__other__":value;
  return(
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      {q.o.map(o=><button key={o} onClick={()=>{setShowOther(false);onChange(o);}} style={{textAlign:"left",padding:"14px 18px",background:sel===o?CL.blueLight:CL.white,border:"1.5px solid "+sel===o?CL.blue:CL.border,borderRadius:12,cursor:"pointer",fontSize:15,color:sel===o?CL.navy:CL.textMid,fontWeight:sel===o?600:400,fontFamily:"inherit",transition:"all 0.15s"}} onMouseEnter={e=>{if(sel!==o)e.currentTarget.style.borderColor=CL.blueBright;}} onMouseLeave={e=>{if(sel!==o)e.currentTarget.style.borderColor=CL.border;}}><span style={{marginRight:10,opacity:0.5}}>{sel===o?"*":"o"}</span>{o}</button>)}
      <button onClick={()=>{setShowOther(s=>!s);if(!showOther)onChange("__other__:");}} style={{textAlign:"left",padding:"14px 18px",background:showOther?CL.blueLight:CL.white,border:"1.5px solid "+(showOther?CL.blue:CL.border),borderRadius:12,cursor:"pointer",fontSize:15,color:showOther?CL.navy:CL.muted,fontStyle:showOther?"normal":"italic",fontFamily:"inherit"}}><span style={{marginRight:10,opacity:0.5}}>{showOther?"*":"o"}</span>Other -- write your own</button>
      {showOther&&<textarea autoFocus value={other} onChange={e=>{setOther(e.target.value);onChange("__other__:"+e.target.value);}} placeholder="Type your answer..." rows={2} style={{width:"100%",padding:"12px 16px",borderRadius:12,border:"1.5px solid "+CL.blue,fontSize:15,color:CL.text,outline:"none",resize:"none",fontFamily:"inherit"}}/>}
    </div>
  );
}

function OpenInput({q,value,onChange}){
  const ref=useRef(null);
  useEffect(()=>{ref.current?.focus();},[]);
  useEffect(()=>{if(ref.current){ref.current.style.height="auto";ref.current.style.height=ref.current.scrollHeight+"px";}},[value]);
  return <textarea ref={ref} value={value||""} onChange={e=>onChange(e.target.value)} placeholder={q.h||"Your answer..."} rows={3} style={{width:"100%",padding:"16px 20px",borderRadius:12,border:"1.5px solid "+CL.border,fontSize:16,color:CL.text,background:CL.white,outline:"none",resize:"none",fontFamily:"inherit",lineHeight:1.7,transition:"border-color 0.2s"}} onFocus={e=>e.target.style.borderColor=CL.blue} onBlur={e=>e.target.style.borderColor=CL.border}/>;
}

function LocationInput({value,onChange}){
  const[text,setText]=useState(value?.text||"");
  const[scope,setScope]=useState(value?.scope||"");
  const chips=["My city only","My state/region","My country","North America","Worldwide","Online only"];
  const upd=(t,s)=>{setText(t);setScope(s);onChange({text:t,scope:s});};
  return(
    <div>
      <input value={text} onChange={e=>upd(e.target.value,scope)} placeholder="City, State, Country -- e.g. Brooklyn, NY, USA" style={{width:"100%",padding:"15px 18px",borderRadius:12,border:"1.5px solid "+CL.border,fontSize:16,color:CL.text,background:CL.white,outline:"none",fontFamily:"inherit",marginBottom:14,transition:"border-color 0.2s"}} onFocus={e=>e.target.style.borderColor=CL.blue} onBlur={e=>e.target.style.borderColor=CL.border}/>
      <div style={{fontSize:13,color:CL.muted,marginBottom:10,fontWeight:600}}>Where would you do business?</div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{chips.map(c=><button key={c} onClick={()=>upd(text,c)} style={{padding:"8px 16px",borderRadius:20,border:"1.5px solid "+scope===c?CL.blue:CL.border,background:scope===c?CL.blueLight:CL.white,color:scope===c?CL.navy:CL.muted,fontSize:13,fontWeight:scope===c?600:400,cursor:"pointer",fontFamily:"inherit"}}>{c}</button>)}</div>
    </div>
  );
}

function AdvisorCard({advisor,text,loading,canDebate,lockedIdea,brief,onUpgradeClick}){
  const[expanded,setExpanded]=useState(false);
  const[replyOpen,setReplyOpen]=useState(false);
  const[replyVal,setReplyVal]=useState("");
  const[replyLoading,setReplyLoading]=useState(false);
  const[thread,setThread]=useState([]);

  // Parse HEADLINE: / ASSESSMENT: format with fallback
  function parse(t){
    if(!t||t.startsWith("[Error")||t.startsWith("[Connection"))return{headline:"Unavailable on mobile -- open on desktop to see this assessmentry",full:"The API call failed. This can happen due to rate limits or network issues. Please try running the Board again."}; 
    const clean=t.replace(/\*\*HEADLINE:\*\*/gi,"HEADLINE:").replace(/\*\*ASSESSMENT:\*\*/gi,"ASSESSMENT:").replace(/---+/g,"").trim();
    const hl=clean.match(/HEADLINE:\s*(.+?)(?=\s*\nASSESSMENT:)/si);
    const as=clean.match(/ASSESSMENT:\s*([\s\S]+)$/si);
    if(hl&&as)return{headline:hl[1].trim(),full:as[1].trim()};
    // Fallback: first 2 sentences vs rest
    const sentences=t.match(/[^.!?]+[.!?]+\s*/g)||[];
    if(sentences.length>2)return{headline:sentences.slice(0,2).join("").trim(),full:sentences.slice(2).join("").trim()};
    return{headline:t,full:null};
  }

  const parsed=parse(text);
  const hasText=!!text&&!text.startsWith("[Error");
  const hasError=!!text&&(text.startsWith("[Error")||text.startsWith("[Connection"));


  async function sendReply(){
    if(!replyVal.trim()||replyLoading)return;
    const msg=replyVal.trim();setReplyVal("");setReplyLoading(true);
    const hist=[...thread,{role:"user",content:msg}];setThread(hist);
    const sys="You are "+advisor.title+". You gave your assessment of \""+lockedIdea?.title+"\". The founder is pushing back. Stay in character. 3-5 sentences. End: Informational only, consult qualified professionals.";
    const reply=await callClaude(sys,"Your assessment: "+text+"\n\nConversation:\n"+hist.map(m=>m.role+": "+m.content).join("\n"));
    setThread([...hist,{role:"assistant",content:reply}]);setReplyLoading(false);
  }

  return(
    <div style={{background:CL.white,borderRadius:16,border:"1.5px solid "+hasError?"#fca5a544":hasText?advisor.color+"44":CL.border,padding:22,position:"relative",overflow:"hidden",boxShadow:hasText?"0 4px 20px "+advisor.color+"10":"none"}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:hasError?"#f97316":advisor.color,opacity:hasText||hasError?1:0.15}}/>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
        <div style={{width:42,height:42,borderRadius:12,fontSize:20,background:advisor.color+"14",border:"1.5px solid "+advisor.color+"33",display:"flex",alignItems:"center",justifyContent:"center"}}>{advisor.emoji}</div>
        <div style={{flex:1}}>
          <div style={{fontWeight:700,color:CL.navy,fontSize:15}}>{advisor.title}</div>
          <div style={{fontSize:12,color:CL.muted,marginTop:2}}>{advisor.focus}</div>
        </div>
        {/* Voice button */}
        {loading&&<div style={{width:18,height:18,borderRadius:"50%",border:"2px solid "+advisor.color+"44",borderTopColor:advisor.color,animation:"spin 0.8s linear infinite"}}/>}
      </div>

      {/* Text display */}
      <div style={{fontSize:14,lineHeight:1.8,color:hasError?"#dc2626":hasText?CL.textMid:CL.muted,minHeight:64,marginBottom:hasText?12:0}}>
        {loading&&!text?<span style={{fontStyle:"italic",color:CL.muted}}>Preparing assessment...</span>
         :hasError?(
        <div style={{background:"#fff5f5",border:"1px solid #fecaca",borderRadius:12,padding:"16px",textAlign:"center"}}>
          <div style={{fontSize:20,marginBottom:8}}>Z</div>
          <div style={{fontSize:13,fontWeight:700,color:"#991b1b",marginBottom:4}}>Advisor unavailable</div>
          <div style={{fontSize:12,color:"#b91c1c",lineHeight:1.6,marginBottom:12}}>The board session requires a desktop browser. This advisor's response couldn't load on mobile.</div>
          <div style={{fontSize:11,color:"#dc2626",background:"#fee2e2",borderRadius:8,padding:"6px 12px",display:"inline-block"}}>Open on desktop for full board access</div>
        </div>
      )
         :hasText?(
           <div>
             <span style={{whiteSpace:"pre-wrap"}}>{parsed.headline}</span>
             {parsed.full&&expanded&&<span style={{whiteSpace:"pre-wrap"}}>{"\n\n"}{parsed.full}</span>}
           </div>
         ):<span style={{color:CL.border}}>Awaiting session...</span>}
      </div>

      {/* Expand / Voice info */}
      {hasText&&(
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
          {parsed.full&&(
            <button onClick={()=>setExpanded(e=>!e)} style={{fontSize:12,color:advisor.color,background:"none",border:"1px solid "+advisor.color+"33",borderRadius:8,padding:"4px 12px",cursor:"pointer",fontFamily:"inherit",fontWeight:600}}>
              {expanded?"^ Show less":"v Read full assessment"}
            </button>
          )}
        </div>
      )}

      {/* Reply thread */}
      {hasText&&(
        <div>
          {thread.length>0&&<div style={{borderTop:"1px solid "+CL.border,paddingTop:12,marginBottom:12,display:"flex",flexDirection:"column",gap:8}}>
            {thread.map((m,i)=><div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}><div style={{maxWidth:"88%",padding:"9px 14px",borderRadius:12,background:m.role==="user"?CL.bluePale:CL.offWhite,color:m.role==="user"?CL.navy:CL.textMid,fontSize:14,lineHeight:1.6,border:"1px solid "+m.role==="user"?CL.borderBlue:CL.border}}>{m.content}</div></div>)}
            {replyLoading&&<div style={{display:"flex",gap:4,padding:"8px 12px",background:CL.offWhite,borderRadius:10,border:"1px solid "+CL.border,width:"fit-content"}}>{[0,1,2].map(i=><div key={i} style={{width:6,height:6,borderRadius:"50%",background:advisor.color}}/>)}</div>}
          </div>}
          {canDebate?(replyOpen?(
            <div style={{display:"flex",gap:8}}>
              <input value={replyVal} onChange={e=>setReplyVal(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!replyLoading)sendReply();}} placeholder={"Push back on "+advisor.title+"..."} style={{flex:1,padding:"10px 14px",borderRadius:10,border:"1.5px solid "+advisor.color,fontSize:14,color:CL.text,outline:"none",fontFamily:"inherit"}}/>
              <button onClick={sendReply} disabled={!replyVal.trim()||replyLoading} style={{padding:"10px 16px",borderRadius:10,background:advisor.color,color:CL.white,border:"none",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"inherit",opacity:!replyVal.trim()||replyLoading?0.4:1}}>-></button>
            </div>
          ):<button onClick={()=>setReplyOpen(true)} style={{fontSize:13,color:advisor.color,background:"none",border:"1px solid "+advisor.color+"44",borderRadius:8,padding:"6px 14px",cursor:"pointer",fontFamily:"inherit",fontWeight:600}}>[chat] Reply to {advisor.title}</button>)
          :<div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}><button onClick={onUpgradeClick} style={{background:"linear-gradient(135deg,#1a56db,#3b82f6)",border:"none",borderRadius:8,padding:"7px 16px",fontSize:12,color:"#fff",fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Z Upgrade to Ignite</button><span style={{fontSize:12,color:"#64748b"}}>to debate your Board</span></div>}
        </div>
      )}
    </div>
  );
}

function DisclaimerModal({onAccept,onDecline}){
  const[checked,setChecked]=useState(false);
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(8,15,43,0.92)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16,overflowY:"auto"}}>
      <div style={{background:CL.white,borderRadius:20,maxWidth:500,width:"100%",overflow:"hidden",boxShadow:"0 24px 80px rgba(0,0,0,0.4)",margin:"auto"}}>
        <div style={{background:"linear-gradient(135deg,"+CL.navy+","+CL.navyMid+")",padding:"22px 28px",display:"flex",alignItems:"flex-start",justifyContent:"space-between"}}>
          <div>
            <div style={{fontSize:10,color:CL.blueBright,letterSpacing:3,textTransform:"uppercase",fontFamily:"monospace",marginBottom:6}}>AieonFounder</div>
            <h2 style={{fontSize:20,color:CL.white,fontWeight:700,margin:0}}>Important Notice</h2>
          </div>
          <button onClick={onDecline} style={{background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:8,color:"rgba(255,255,255,0.7)",fontSize:16,width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontFamily:"inherit",flexShrink:0,marginTop:2}}>x</button>
        </div>
        <div style={{padding:"22px 28px",fontSize:14,color:CL.textMid,lineHeight:1.75,wordBreak:"break-word"}}><p>{DISCLAIMER_FULL}</p></div>
        <div style={{padding:"0 28px 24px"}}>
          <label style={{display:"flex",alignItems:"flex-start",gap:12,cursor:"pointer",marginBottom:18}}>
            <input type="checkbox" checked={checked} onChange={e=>setChecked(e.target.checked)} style={{width:18,height:18,marginTop:2,accentColor:CL.blue,cursor:"pointer",flexShrink:0}}/>
            <span style={{fontSize:14,color:CL.textMid,lineHeight:1.5}}>I have read and understand this disclaimer. I will verify important decisions with qualified legal, financial, and business professionals.</span>
          </label>
          <button onClick={onAccept} disabled={!checked} style={{width:"100%",background:checked?"linear-gradient(135deg,"+CL.blue+","+CL.blueBright+")":CL.border,color:checked?CL.white:CL.muted,border:"none",borderRadius:12,padding:"14px",fontSize:15,fontWeight:700,cursor:checked?"pointer":"default",fontFamily:"inherit",transition:"all 0.3s"}}>
            {checked?"I Understand -- Let's Begin ->":"Check the box above to continue"}
          </button>
        </div>
      </div>
    </div>
  );
}

function MBTIReveal({type,onConfirm,onRetake}){
  const t=MBTI_TYPES[type]||MBTI_TYPES.ENFP;
  const[step,setStep]=useState(0);
  const sparks=[
    {l:"8%",t:"12%",s:3,bg:"#00d4c8",dur:"2.6s",del:"0s"},
    {l:"88%",t:"22%",s:4,bg:"#3b6ef8",dur:"3.1s",del:"0.5s"},
    {l:"14%",t:"70%",s:2,bg:"#5588ff",dur:"2.4s",del:"1.0s"},
    {l:"82%",t:"66%",s:3,bg:"#00f0e0",dur:"3.3s",del:"1.5s"},
    {l:"46%",t:"8%",s:4,bg:"#00d4c8",dur:"2.9s",del:"0.8s"},
    {l:"92%",t:"48%",s:2,bg:"#3b6ef8",dur:"3.2s",del:"1.2s"},
    {l:"5%",t:"50%",s:3,bg:"#00d4c8",dur:"2.7s",del:"0.3s"},
    {l:"56%",t:"88%",s:4,bg:"#5588ff",dur:"3.4s",del:"1.8s"},
    {l:"30%",t:"30%",s:2,bg:"#3b6ef8",dur:"2.5s",del:"2.1s"},
    {l:"72%",t:"14%",s:3,bg:"#00d4c8",dur:"2.8s",del:"0.7s"},
  ];

  useEffect(()=>{
    const t1=setTimeout(()=>setStep(1),300);
    const t2=setTimeout(()=>setStep(2),900);
    const t3=setTimeout(()=>setStep(3),1600);
    return()=>{clearTimeout(t1);clearTimeout(t2);clearTimeout(t3);};
  },[]);

  // Dimension breakdown from type letter
  const dims=[
    {label:type[0]==="E"?"Extroverted":"Introverted",sub:type[0]==="E"?"Energy from people":"Energy from solitude",color:"#3b6ef8"},
    {label:type[1]==="N"?"Intuitive":"Sensing",sub:type[1]==="N"?"Pattern & possibility":"Detail & concrete",color:"#8b5cf6"},
    {label:type[2]==="T"?"Thinking":"Feeling",sub:type[2]==="T"?"Logic-first decisions":"Values-first decisions",color:"#0891b2"},
    {label:type[3]==="J"?"Judging":"Perceiving",sub:type[3]==="J"?"Structured & planned":"Flexible & adaptive",color:"#059669"},
  ];

  return(
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#060d1f,#0d1f4e)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"24px 16px",fontFamily:"system-ui,sans-serif",position:"relative",overflow:"hidden"}}>
      {sparks.map(function(sp,i){ return(
        <div key={i} style={{position:"absolute",left:sp.l,top:sp.t,width:sp.s,height:sp.s,background:sp.bg,borderRadius:"50%",animation:"arcSpark "+sp.dur+" linear "+sp.del+" infinite",opacity:0,pointerEvents:"none"}}/>
      ); })}
      {[200,280].map(function(r,i){ return(
        <div key={i} style={{position:"absolute",width:r,height:r,borderRadius:"50%",border:"1px solid rgba(59,130,246,"+(0.12-i*0.04)+")",animation:"arcRing "+(4+i)+"s ease-in-out "+(i*1.5)+"s infinite",pointerEvents:"none"}}/>
      ); })}

      <div style={{maxWidth:520,width:"100%",textAlign:"center"}}>

        {/* Label */}
        <div style={{fontSize:10,color:"#3b6ef8",letterSpacing:4,textTransform:"uppercase",fontFamily:"monospace",marginBottom:16,opacity:step>=1?1:0,transition:"opacity 0.5s"}}>
          Your Founder Personality Type
        </div>

        {/* Type code -- dramatic reveal */}
        <div style={{position:"relative",marginBottom:8}}>
          <div style={{fontSize:"clamp(64px,14vw,100px)",fontWeight:900,color:"#fff",lineHeight:1,letterSpacing:"-2px",animation:step>=1?"cardIn 0.5s ease":"none",opacity:step>=1?1:0,filter:step>=1?"drop-shadow(0 0 24px rgba(59,110,248,0.7))":"none",transition:"filter 0.8s,opacity 0.5s"}}>
            {type}
          </div>
        </div>

        {/* Name + tag */}
        <div style={{opacity:step>=2?1:0,transition:"opacity 0.6s",animation:step>=2?"fadeUp 0.5s ease":"none"}}>
          <div style={{fontSize:"clamp(20px,4vw,26px)",fontWeight:800,color:"#3b6ef8",marginBottom:6}}>{t.name}</div>
          <div style={{fontSize:15,color:"rgba(255,255,255,0.5)",fontStyle:"italic",marginBottom:24}}>"{t.tag}"</div>
        </div>

        {/* Dimension pills */}
        {step>=2&&(
          <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap",marginBottom:24,animation:"fadeUp 0.5s ease"}}>
            {dims.map(function(d,i){ return(
              <div key={i} style={{background:d.color+"18",border:"1px solid "+d.color+"44",borderRadius:40,padding:"5px 14px",animation:"cardIn 0.4s ease "+(i*0.1)+"s both"}}>
                <div style={{fontSize:12,fontWeight:700,color:d.color}}>{d.label}</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,0.5)"}}>{d.sub}</div>
              </div>
            ); })}
          </div>
        )}

        {/* Description card */}
        {step>=3&&(
          <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:18,padding:"20px 22px",marginBottom:20,textAlign:"left",animation:"fadeUp 0.5s ease"}}>
            <p style={{fontSize:14,color:"rgba(255,255,255,0.75)",lineHeight:1.8,marginBottom:14}}>{t.desc}</p>
            {t.fit&&t.fit.length>0&&(
              <>
                <div style={{fontSize:10,color:"#3b6ef8",letterSpacing:2,textTransform:"uppercase",fontWeight:700,marginBottom:10}}>Natural Fit Businesses</div>
                {t.fit.map(function(b,i){ return(
                  <div key={i} style={{display:"flex",gap:8,marginBottom:6,alignItems:"flex-start"}}>
                    <span style={{color:"#00d4c8",flexShrink:0,marginTop:1}}>-></span>
                    <span style={{fontSize:13,color:"rgba(255,255,255,0.6)",lineHeight:1.5}}>{b}</span>
                  </div>
                ); })}
              </>
            )}
          </div>
        )}

        {/* Actions */}
        {step>=3&&(
          <div style={{animation:"fadeUp 0.5s ease"}}>
            <button onClick={onConfirm} style={{width:"100%",background:"linear-gradient(135deg,#1a56db,#00d4c8)",color:"#fff",border:"none",borderRadius:14,padding:"16px",fontSize:16,fontWeight:800,cursor:"pointer",fontFamily:"inherit",marginBottom:10,boxShadow:"0 8px 32px rgba(26,86,219,0.4)"}}>
              This is me -- show my ScoreCard ->
            </button>
            <button onClick={onRetake} style={{width:"100%",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.45)",borderRadius:12,padding:"12px",fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>
              Retake -- this doesn't feel right
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// -- Demo profile -- pre-loaded for testing without quiz ---------------
const DEMO_PROFILES = [
  // -- Under $1K profiles (30% of early users) ------------------
  {
    _label:"Marcus, Newark NJ * Under $1,000",
    mbtiType:"ESTP",
    work_hist:"Recently laid off warehouse supervisor. 8 years managing logistics for a regional distributor. Strong at scheduling, team coordination, and vendor relationships. No college degree.",
    languages:"English, some Spanish",
    community:"Black men's business group, local church network, youth mentorship program",
    problem:"Small businesses in my area can't find reliable last-mile delivery drivers",
    success:"Own something. Stop working for someone else.",
    feeling:"Frustrated but determined -- I've been the one making things run for years",
    idea_hist:"Thought about a delivery business but didn't know how to start without a truck",
    location:{text:"Newark, New Jersey", scope:"local"},
    capital:"Under $1,000",
    hours:"20-30 hours/week",
    recharge:"With people -- energy comes from the team",
    workstyle:"On the move, hands-on, not desk work",
    friends:"The connector -- always introducing people",
    risk:"Low -- I can't afford to lose what I have",
    timeline:"1-3 months to first revenue",
  },
  {
    _label:"Priya, Houston TX * Under $1,000",
    mbtiType:"ISFJ",
    work_hist:"Registered nurse, 6 years in pediatric care. Currently working nights. Strong patient communication, scheduling, and care coordination. Bilingual.",
    languages:"English, Tamil",
    community:"South Asian women's network, nursing alumni group, temple community",
    problem:"Immigrant families don't understand how to navigate US healthcare paperwork and insurance",
    success:"Financial freedom and more time with my kids",
    feeling:"Burnt out from the hospital -- ready to use my skills differently",
    idea_hist:"Friends keep asking me to help them understand their medical bills and insurance claims",
    location:{text:"Houston, Texas", scope:"local"},
    capital:"Under $1,000",
    hours:"10-20 hours/week",
    recharge:"Alone -- I need quiet after the hospital",
    workstyle:"Structured, scheduled, detail-oriented",
    friends:"The reliable one -- people trust me with serious things",
    risk:"Low -- I have a family to support",
    timeline:"1-3 months to first revenue",
  },
  {
    _label:"Jordan, Atlanta GA * Under $1,000",
    mbtiType:"ENFP",
    work_hist:"College senior, marketing major. Runs a 12K follower Instagram about Atlanta food. Has done two paid brand deals. No full-time work experience.",
    languages:"English",
    community:"HBCU alumni network, Atlanta food scene, Gen Z entrepreneur Discord",
    problem:"Local Atlanta restaurants have no idea how to market to Gen Z",
    success:"Build something before I graduate so I never have to apply for a job",
    feeling:"Excited and a little scared -- this has to work",
    idea_hist:"My food page keeps getting DMs from restaurant owners asking how I grew it",
    location:{text:"Atlanta, Georgia", scope:"local"},
    capital:"Under $1,000",
    hours:"20-30 hours/week",
    recharge:"With people -- I get energy from the crowd",
    workstyle:"Creative chaos, late nights, always on my phone",
    friends:"The trendsetter -- first to try everything new",
    risk:"High -- I'm young, I can afford to fail fast",
    timeline:"1-3 months to first revenue",
  },
  // -- $1K-$25K profiles ----------------------------------------
  {
    _label:"Diana, Chicago IL * $5,000-$25,000",
    mbtiType:"ESFJ",
    work_hist:"Licensed cosmetologist, 11 years. Owns a chair at a salon in Logan Square. Has 400+ loyal clients. Teaches hair braiding workshops on weekends.",
    languages:"English, Haitian Creole",
    community:"Haitian diaspora community, Chicago Black business network, salon owner Facebook group",
    problem:"Black women in Chicago can't find stylists who specialize in natural hair transitions",
    success:"My own salon, my own hours, and generational wealth for my kids",
    feeling:"Ready -- I've been building toward this without knowing it",
    idea_hist:"Clients keep asking me to open my own place. I have the skills but not the roadmap.",
    location:{text:"Chicago, Illinois", scope:"local"},
    capital:"$5,000-$25,000",
    hours:"10-20 hours/week",
    recharge:"With people -- my clients are my energy",
    workstyle:"Hands-on creative, relationship-driven",
    friends:"The nurturer -- everyone comes to me with their problems",
    risk:"Medium -- I can afford to lose some but not everything",
    timeline:"3-6 months to first revenue",
  },
  {
    _label:"Raj, San Jose CA * $5,000-$25,000",
    mbtiType:"INTJ",
    work_hist:"Software engineer, 7 years at mid-size SaaS companies. Laid off 3 months ago. Strong in Python, data pipelines, and API integration. Has built two side projects that never launched.",
    languages:"English, Hindi, Telugu",
    community:"Indian tech diaspora, YC alumni Slack, local startup meetups",
    problem:"Small businesses are drowning in data they don't know how to use",
    success:"Build something real. Stop building for other people's visions.",
    feeling:"This is my window. I have savings and no obligations right now.",
    idea_hist:"Always wanted to start something. Kept waiting for the perfect idea.",
    location:{text:"San Jose, California", scope:"local"},
    capital:"$5,000-$25,000",
    hours:"40+ hours/week",
    recharge:"Alone -- deep focus, no interruptions",
    workstyle:"Systems thinker, documentation obsessed, slow to decide",
    friends:"The one who researches everything before acting",
    risk:"Medium -- I have runway but it's finite",
    timeline:"3-6 months to first revenue",
  },
  {
    _label:"Carmen, Miami FL * $1,000-$5,000",
    mbtiType:"ENFJ",
    work_hist:"10 years in hospitality management at luxury hotels. Managed teams of 30+, event coordination, VIP client relations. Speaks three languages.",
    languages:"English, Spanish, Portuguese",
    community:"Latin business owners network, Miami hospitality industry, Venezuelan expat community",
    problem:"Corporate clients in Miami need bilingual event coordination they can trust",
    success:"Build something that honors my parents' sacrifice coming to this country",
    feeling:"Nervous but more ready than I've ever been",
    idea_hist:"Planned a friend's wedding as a favor. Got three referrals from guests the same night.",
    location:{text:"Miami, Florida", scope:"local"},
    capital:"$1,000-$5,000",
    hours:"20-30 hours/week",
    recharge:"With people -- I thrive in a crowd",
    workstyle:"High energy, detail-oriented, never misses a deadline",
    friends:"The organizer -- every group trip, every event, it's me",
    risk:"Medium -- calculated risks only",
    timeline:"1-3 months to first revenue",
  },
  // -- $25K-$100K profiles --------------------------------------
  {
    _label:"Derek, Dallas TX * $25,000-$100,000",
    mbtiType:"ENTJ",
    work_hist:"Retired Army officer, 12 years. Led logistics operations for a 200-person unit. MBA from UT Dallas. Now in corporate supply chain consulting.",
    languages:"English",
    community:"Veterans in business network, Dallas entrepreneur community, MBA alumni",
    problem:"Small manufacturers can't afford enterprise-level supply chain software",
    success:"Build a company that reflects military values -- discipline, excellence, mission",
    feeling:"Methodical and ready. I've planned harder missions than this.",
    idea_hist:"Consulted for three manufacturers who all said the same thing: we need this but can't afford it.",
    location:{text:"Dallas, Texas", scope:"local"},
    capital:"$25,000-$100,000",
    hours:"30-40 hours/week",
    recharge:"Alone -- early mornings, structured days",
    workstyle:"Mission-first, systems-based, zero tolerance for ambiguity",
    friends:"The strategist -- always thinking three moves ahead",
    risk:"Medium -- disciplined risk management",
    timeline:"6-12 months to first revenue",
  },
  {
    _label:"Aisha, Brooklyn NY * $5,000-$25,000",
    mbtiType:"INFJ",
    work_hist:"Social worker turned nonprofit director. 9 years working with at-risk youth in Bed-Stuy. Grant writing, program development, community organizing.",
    languages:"English",
    community:"Brooklyn community leaders, nonprofit network, Black women founders group",
    problem:"Youth programs in underserved communities can't access quality mental health resources",
    success:"Create something sustainable that outlives me and funds itself",
    feeling:"Passionate and a little overwhelmed -- but I know this community better than anyone",
    idea_hist:"Built a program that served 200 kids with a $40K budget. Now I want to scale it.",
    location:{text:"Brooklyn, New York", scope:"local"},
    capital:"$5,000-$25,000",
    hours:"20-30 hours/week",
    recharge:"Alone -- writing, thinking, long walks",
    workstyle:"Mission-driven, collaborative, consensus-builder",
    friends:"The advocate -- always fighting for someone",
    risk:"Low -- I protect the community first",
    timeline:"6-12 months to first revenue",
  },
  {
    _label:"Tommy, Phoenix AZ * $1,000-$5,000",
    mbtiType:"ISTP",
    work_hist:"HVAC technician for 14 years. Now a lead tech at a commercial company. Has all his licenses. Wants to stop making money for his boss.",
    languages:"English",
    community:"Trades Facebook groups, Phoenix home services network, church community",
    problem:"Homeowners in the Phoenix suburbs can't get HVAC service calls in under 48 hours",
    success:"Own a business my son can inherit",
    feeling:"I know I can do this. I just don't know the business side.",
    idea_hist:"Done side jobs for years. Regular customers keep asking me to go full time.",
    location:{text:"Phoenix, Arizona", scope:"local"},
    capital:"$1,000-$5,000",
    hours:"10-20 hours/week",
    recharge:"With people -- on the job, with the crew",
    workstyle:"Early starts, get it done, hands dirty",
    friends:"The dependable one -- shows up every time",
    risk:"Low -- I have a family, can't gamble",
    timeline:"1-3 months to first revenue",
  },
  {
    _label:"Mei, Seattle WA * $5,000-$25,000",
    mbtiType:"INTP",
    work_hist:"E-commerce operations manager, 5 years. Managed Shopify stores doing $2M+ annually. Deep knowledge of fulfillment, ads, and customer retention.",
    languages:"English, Mandarin",
    community:"Asian American founders network, Seattle tech scene, e-commerce operators Slack",
    problem:"Small DTC brands are leaving money on the table with terrible retention strategies",
    success:"Build a profitable business with a small team and no VC",
    feeling:"Quietly confident -- I've been doing this for other people long enough",
    idea_hist:"Three founders have offered to pay me to run their ops. I kept saying no. Now I'm ready to say yes on my own terms.",
    location:{text:"Seattle, Washington", scope:"local"},
    capital:"$5,000-$25,000",
    hours:"30-40 hours/week",
    recharge:"Alone -- I think best in silence",
    workstyle:"Data-driven, async, no meetings before 10am",
    friends:"The quiet one who actually gets things done",
    risk:"Medium -- calculated, spreadsheet-backed",
    timeline:"1-3 months to first revenue",
  },
];

function pickDemoProfile(){
  return DEMO_PROFILES[Math.floor(Math.random()*DEMO_PROFILES.length)];
}

// -- MAIN --------------------------------------------------------------

// ==============================================================
// FOUNDER ARC
// ==============================================================

const ARC_PATHWAYS=[
  {id:"formation",label:"Formation",color:"#1a56db",icon:"[pillars]",nodes:[
    {id:"f1",label:"Entity Setup",desc:"LLC vs S-Corp, state registration, registered agent.",badge:"Formation Started"},
    {id:"f2",label:"Tax & EIN",desc:"EIN application, NAICS code, quarterly tax calendar.",badge:"Tax Ready"},
    {id:"f3",label:"Banking",desc:"Business checking, payment processing, cash flow basics.",badge:"Banking Unlocked"},
    {id:"f4",label:"Business Credit",desc:"DUNS number, Net-30 accounts, Paydex score building.",badge:"Credit Builder"},
    {id:"f5",label:"Compliance",desc:"FinCEN BOI filing, licenses, sales tax nexus.",badge:"Compliant"},
  ]},
  {id:"validation",label:"Validation",color:"#0891b2",icon:"[target]",nodes:[
    {id:"v1",label:"Problem Confirmed",desc:"5 real conversations with potential customers.",badge:"Problem Solver"},
    {id:"v2",label:"First Offer",desc:"A specific priced offer sent to at least 3 leads.",badge:"Offer Made"},
    {id:"v3",label:"First Revenue",desc:"First dollar collected from a paying customer.",badge:"$1 Club"},
    {id:"v4",label:"First $1K",desc:"$1,000 in total revenue reached.",badge:"$1K Club"},
    {id:"v5",label:"Model Locked",desc:"Repeatable offer defined and documented.",badge:"Model Builder"},
  ]},
  {id:"operations",label:"Operations",color:"#7c3aed",icon:"@",nodes:[
    {id:"o1",label:"Tools Stack",desc:"Core tools selected -- accounting, CRM, communication.",badge:"Operator"},
    {id:"o2",label:"First Contract",desc:"Written agreement signed before first client.",badge:"Contract Signed"},
    {id:"o3",label:"Insurance",desc:"General liability and professional coverage secured.",badge:"Protected"},
    {id:"o4",label:"Systems Built",desc:"Repeatable delivery process documented.",badge:"Systems Founder"},
    {id:"o5",label:"First Hire",desc:"First contractor or employee onboarded.",badge:"Team Builder"},
  ]},
  {id:"growth",label:"Growth",color:"#d97706",icon:"[up]",nodes:[
    {id:"g1",label:"$10K Revenue",desc:"$10,000 in total revenue reached.",badge:"$10K Club"},
    {id:"g2",label:"Marketing Channel",desc:"One repeatable customer acquisition channel.",badge:"Growth Engine"},
    {id:"g3",label:"First Partnership",desc:"A strategic partnership or referral relationship.",badge:"Networker"},
    {id:"g4",label:"Funding Ready",desc:"Financial records clean and pitch narrative prepared.",badge:"Investor Ready"},
    {id:"g5",label:"$50K Revenue",desc:"$50,000 in total revenue reached.",badge:"$50K Club"},
  ]},
  {id:"legacy",label:"Legacy",color:"#059669",icon:"AIEON_LOGO",nodes:[
    {id:"l1",label:"Community Impact",desc:"A founder you mentored through their journey.",badge:"Mentor"},
    {id:"l2",label:"Accelerator Applied",desc:"Applied to at least one accelerator or grant.",badge:"Accelerator Ready"},
    {id:"l3",label:"6-Month Survivor",desc:"Business operating and generating revenue at 6 months.",badge:"Survivor"},
    {id:"l4",label:"1-Year Milestone",desc:"One full year in business.",badge:"1 Year Strong"},
    {id:"l5",label:"AieonLabs Alumni",desc:"A real business built from AieonFounder.",badge:"AieonLabs Alumni"},
  ]},
];


function AieonLogoMark({size}){
  const s=size||120;
  return(
    <div style={{position:"relative",width:s,height:s,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{position:"absolute",inset:-20,borderRadius:"50%",background:"radial-gradient(circle,rgba(59,110,248,0.35) 0%,rgba(0,212,200,0.15) 50%,transparent 70%)",filter:"blur(12px)"}} />
      <div style={{position:"absolute",inset:-10,borderRadius:"50%",background:"radial-gradient(circle,rgba(59,110,248,0.2) 0%,transparent 70%)",filter:"blur(6px)"}} />
      <img src={AIEON_LOGO_B64} alt="AieonLabs" style={{width:s,height:s,objectFit:"contain",filter:"drop-shadow(0 0 12px rgba(59,110,248,0.9)) drop-shadow(0 0 24px rgba(0,212,200,0.6)) drop-shadow(0 0 40px rgba(59,110,248,0.4))",position:"relative",zIndex:1}}/>
    </div>
  );
}

function ArcSparks(){
  const sparks=[
    {l:"12%",t:"18%",s:3,bg:"#00d4c8",dur:"2.6s",del:"0s"},
    {l:"78%",t:"32%",s:4,bg:"#3b6ef8",dur:"3.1s",del:"0.4s"},
    {l:"22%",t:"52%",s:2,bg:"#00d4c8",dur:"2.4s",del:"0.9s"},
    {l:"65%",t:"62%",s:3,bg:"#5588ff",dur:"3.4s",del:"1.4s"},
    {l:"44%",t:"14%",s:4,bg:"#00d4c8",dur:"2.9s",del:"0.7s"},
    {l:"86%",t:"48%",s:2,bg:"#3b6ef8",dur:"3.2s",del:"1.1s"},
    {l:"8%",t:"68%",s:3,bg:"#00f0e0",dur:"2.7s",del:"0.3s"},
    {l:"54%",t:"78%",s:4,bg:"#3b6ef8",dur:"3.3s",del:"1.7s"},
    {l:"33%",t:"24%",s:2,bg:"#00d4c8",dur:"2.5s",del:"2.1s"},
    {l:"72%",t:"16%",s:3,bg:"#5588ff",dur:"2.8s",del:"0.6s"},
    {l:"91%",t:"55%",s:3,bg:"#00d4c8",dur:"3.0s",del:"1.6s"},
    {l:"5%",t:"35%",s:4,bg:"#3b6ef8",dur:"2.3s",del:"0.2s"},
    {l:"48%",t:"88%",s:2,bg:"#00f0e0",dur:"3.6s",del:"1.2s"},
    {l:"29%",t:"8%",s:3,bg:"#5588ff",dur:"2.7s",del:"0.8s"},
    {l:"67%",t:"44%",s:4,bg:"#00d4c8",dur:"3.1s",del:"2.3s"},
    {l:"15%",t:"72%",s:2,bg:"#3b6ef8",dur:"2.5s",del:"1.8s"},
    {l:"83%",t:"20%",s:3,bg:"#00d4c8",dur:"2.9s",del:"0.5s"},
    {l:"39%",t:"58%",s:4,bg:"#5588ff",dur:"3.4s",del:"1.0s"},
    {l:"57%",t:"10%",s:2,bg:"#3b6ef8",dur:"2.6s",del:"2.5s"},
    {l:"76%",t:"80%",s:3,bg:"#00f0e0",dur:"3.2s",del:"0.1s"},
    {l:"3%",t:"48%",s:4,bg:"#00d4c8",dur:"2.8s",del:"1.3s"},
    {l:"94%",t:"38%",s:2,bg:"#3b6ef8",dur:"3.5s",del:"0.7s"},
    {l:"21%",t:"92%",s:3,bg:"#5588ff",dur:"2.4s",del:"1.9s"},
    {l:"62%",t:"26%",s:4,bg:"#00d4c8",dur:"3.0s",del:"2.2s"},
    {l:"41%",t:"70%",s:2,bg:"#3b6ef8",dur:"2.7s",del:"0.4s"},
    {l:"18%",t:"42%",s:3,bg:"#00f0e0",dur:"3.3s",del:"1.5s"},
    {l:"85%",t:"65%",s:4,bg:"#00d4c8",dur:"2.5s",del:"2.8s"},
    {l:"52%",t:"36%",s:2,bg:"#5588ff",dur:"3.1s",del:"0.9s"},
    {l:"7%",t:"82%",s:3,bg:"#3b6ef8",dur:"2.9s",del:"2.0s"},
    {l:"70%",t:"6%",s:4,bg:"#00d4c8",dur:"3.6s",del:"1.1s"},
    {l:"25%",t:"30%",s:3,bg:"#5588ff",dur:"2.6s",del:"3.1s"},
    {l:"58%",t:"50%",s:2,bg:"#00d4c8",dur:"3.8s",del:"0.3s"},
    {l:"11%",t:"15%",s:4,bg:"#3b6ef8",dur:"2.4s",del:"2.6s"},
    {l:"79%",t:"70%",s:3,bg:"#00f0e0",dur:"3.1s",del:"1.4s"},
    {l:"35%",t:"95%",s:2,bg:"#5588ff",dur:"2.7s",del:"0.8s"},
    {l:"92%",t:"28%",s:4,bg:"#00d4c8",dur:"3.4s",del:"2.0s"},
    {l:"46%",t:"42%",s:3,bg:"#3b6ef8",dur:"2.9s",del:"1.7s"},
    {l:"14%",t:"60%",s:2,bg:"#00f0e0",dur:"3.2s",del:"0.5s"},
    {l:"67%",t:"85%",s:4,bg:"#00d4c8",dur:"2.5s",del:"3.3s"},
    {l:"88%",t:"12%",s:3,bg:"#5588ff",dur:"3.6s",del:"1.0s"},
    {l:"31%",t:"75%",s:2,bg:"#3b6ef8",dur:"2.8s",del:"2.4s"},
    {l:"53%",t:"22%",s:4,bg:"#00d4c8",dur:"3.0s",del:"0.2s"},
    {l:"2%",t:"55%",s:3,bg:"#00f0e0",dur:"2.6s",del:"1.8s"},
    {l:"75%",t:"40%",s:2,bg:"#3b6ef8",dur:"3.5s",del:"0.6s"},
    {l:"42%",t:"8%",s:4,bg:"#5588ff",dur:"2.3s",del:"2.9s"},
    {l:"19%",t:"88%",s:3,bg:"#00d4c8",dur:"3.1s",del:"1.3s"},
    {l:"96%",t:"62%",s:2,bg:"#3b6ef8",dur:"2.7s",del:"0.1s"},
    {l:"60%",t:"32%",s:4,bg:"#00f0e0",dur:"3.4s",del:"2.2s"},
    {l:"37%",t:"48%",s:3,bg:"#00d4c8",dur:"2.9s",del:"1.6s"},
    {l:"82%",t:"90%",s:2,bg:"#5588ff",dur:"3.7s",del:"0.4s"},
    {l:"9%",t:"25%",s:4,bg:"#3b6ef8",dur:"2.5s",del:"3.0s"},
    {l:"50%",t:"65%",s:3,bg:"#00d4c8",dur:"3.2s",del:"0.9s"},
    {l:"27%",t:"5%",s:2,bg:"#00f0e0",dur:"2.6s",del:"2.7s"},
    {l:"71%",t:"52%",s:4,bg:"#3b6ef8",dur:"3.0s",del:"1.5s"},
    {l:"16%",t:"78%",s:3,bg:"#5588ff",dur:"2.8s",del:"0.7s"},
    {l:"89%",t:"18%",s:2,bg:"#00d4c8",dur:"3.5s",del:"2.3s"},
    {l:"44%",t:"35%",s:4,bg:"#3b6ef8",dur:"2.4s",del:"1.2s"},
    {l:"63%",t:"72%",s:3,bg:"#00f0e0",dur:"3.3s",del:"0.0s"},
    {l:"4%",t:"42%",s:2,bg:"#00d4c8",dur:"2.7s",del:"1.9s"},
    {l:"77%",t:"58%",s:4,bg:"#5588ff",dur:"3.6s",del:"2.8s"},
  ];
  return(
    <div style={{position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden"}}>
      {sparks.map(function(sp,i){ return(
        <div key={i} style={{position:"absolute",left:sp.l,top:sp.t,width:sp.s,height:sp.s,background:sp.bg,borderRadius:"50%",animation:"arcSpark "+sp.dur+" linear "+sp.del+" infinite",opacity:0}}/>
      ); })}
    </div>
  );
}

// -- Arc Guide opening prompts -------------------------------------------------
var ARC_GUIDE_PROMPTS = {
  f1:{open:"Let's talk about your business entity structure. This is one of the most important early decisions you'll make -- it affects your taxes, liability, and how you can raise money. Have you already decided what kind of entity you want to form, or are you still exploring your options?",ctx:"You are the Arc Guide for AieonFounder -- a warm, knowledgeable consultant helping a founder choose and form their business entity. Ask one question at a time. Be specific and actionable. Never dump information -- consult. Always remind them to verify with a licensed attorney or accountant before acting."},
  f2:{open:"Your EIN is your business's tax ID -- you need it to open a bank account, hire employees, and file taxes. Do you already have your entity formed, or are we getting that sorted first?",ctx:"You are the Arc Guide helping a founder get their EIN and understand their basic tax structure. Walk them through the IRS EIN application, NAICS codes, and quarterly tax basics. Always remind them to verify with a licensed CPA."},
  f3:{open:"Opening a dedicated business bank account separates your personal and business finances, which protects you legally and keeps your books clean. Do you have a bank in mind, or would it help to talk through what to look for?",ctx:"You are the Arc Guide helping a founder choose and open a business bank account. Cover what features matter, keeping finances separate, and common options. Be practical."},
  f4:{open:"Building business credit early gives you access to capital and better vendor terms as you grow. Most founders don't think about this until they need it. Do you know your current business credit situation, or is this brand new?",ctx:"You are the Arc Guide helping a founder build business credit. Cover DUNS numbers, Net-30 accounts, and Paydex scores. Be encouraging and clear -- this is often new territory."},
  f5:{open:"Compliance is really just a checklist -- making sure you're registered where you need to be, filing what's required, and not getting caught off guard. Let's start with FinCEN's BOI filing -- do you know what that is, and have you filed it yet?",ctx:"You are the Arc Guide helping a founder with compliance -- FinCEN BOI, business licenses, sales tax. Be specific about deadlines. Always advise verifying with a licensed attorney or accountant."},
  v1:{open:"Validating your problem means real conversations with real people who might pay you -- not surveys, not assumptions. Have you had any of those conversations yet, or are we starting from zero?",ctx:"You are the Arc Guide helping a founder validate their business problem through customer conversations. Push for specifics. Help them identify who to talk to and what to ask. Discourage assumptions."},
  v2:{open:"Making your first offer is where things get real. A lot of founders prepare for months and never ask anyone to pay them. I want to help you build a specific, priced offer you can send to three real people this week. What does your offer look like right now?",ctx:"You are the Arc Guide helping a founder craft and send their first real offer. Be direct. Push them to name a price, a customer, and a date. Vagueness is the enemy."},
  v3:{open:"Your first dollar of revenue is a psychological milestone as much as a financial one. It proves the market is real. Where are you right now -- have you sent any proposals, had conversations about payment, or is your first paying customer still ahead of you?",ctx:"You are the Arc Guide helping a founder reach their first revenue. Be encouraging but practical. Help them find the shortest path to a real transaction."},
  v4:{open:"Getting to $1,000 in revenue means you've done it more than once -- that's proof you have something repeatable, not just a lucky sale. Where are you right now in terms of total revenue and number of customers?",ctx:"You are the Arc Guide helping a founder reach $1,000 in total revenue. Focus on repeatability -- the second, third, and fourth customer. Help them find patterns."},
  v5:{open:"Locking your model means you can describe exactly what you sell, who buys it, what it costs, and how you deliver it -- in two sentences. Can you do that right now? Try it out loud, and we'll refine it together.",ctx:"You are the Arc Guide helping a founder define their repeatable business model. Push for specificity. A locked model fits in two sentences: who, what, price, delivery."},
  o1:{open:"Your tools stack is everything you run your business on -- accounting, CRM, communication, delivery. The goal is the smallest set of tools that gets the job done. What tools are you using right now, even informally?",ctx:"You are the Arc Guide helping a founder select their core business tools. Keep it lean. Cover accounting, CRM, and communication. Match recommendations to stage and budget."},
  o2:{open:"A written contract before your first client protects you, sets expectations, and signals that you're a professional. Even a one-page agreement matters. Have you used any written agreements yet, or is this your first time?",ctx:"You are the Arc Guide helping a founder create client contracts. Cover what to include and where to find templates. Always recommend they have a lawyer review before use."},
  o3:{open:"Business insurance is one of those things founders skip until something goes wrong. General liability and professional liability can protect everything you've built. What type of business are you running, and do you have any coverage?",ctx:"You are the Arc Guide helping a founder understand business insurance. Cover general liability and professional liability. Recommend speaking with an independent broker."},
  o4:{open:"A system is anything you can hand to someone else and they can execute without you. When your delivery process only lives in your head, you have a job, not a business. Can you walk me through how you currently deliver your product or service, step by step?",ctx:"You are the Arc Guide helping a founder document their delivery into a repeatable system. Push for specifics -- steps, handoffs, checkpoints. The goal is something another person can follow."},
  o5:{open:"Your first hire changes how you operate. It requires clarity about the role, the pay, and how you'll manage them. Are you thinking about a specific role, or still figuring out what to offload first?",ctx:"You are the Arc Guide helping a founder make their first hire. Cover contractor vs employee, job description, compensation, and onboarding basics. Always advise consulting an HR professional or employment attorney."},
  g1:{open:"$10,000 in revenue means your business has legs and your early systems are being tested. Where are you right now, and what's been your most reliable source of revenue?",ctx:"You are the Arc Guide helping a founder push toward $10K revenue. Focus on what's working and how to do more of it. Help them identify their highest-value activities."},
  g2:{open:"A repeatable acquisition channel means you can predict how many new customers you'll get based on what you do. What's currently bringing you the most customers -- even if it's informal?",ctx:"You are the Arc Guide helping a founder systematize their best customer acquisition channel. Push for specificity -- not 'social media' but which platform, what content, what conversion path."},
  g3:{open:"A strategic partnership multiplies your reach without multiplying your costs. Have you had any conversations with potential partners, or is this new territory?",ctx:"You are the Arc Guide helping a founder build their first strategic partnership. Help them think about who serves the same customers and what they could offer each other."},
  g4:{open:"Being funding-ready doesn't mean raising money right now -- it means your financials are clean and your story is clear. How clean are your financial records right now?",ctx:"You are the Arc Guide helping a founder get financially organized and pitch-ready. Cover P&L basics, bookkeeping, and pitch structure. Recommend a bookkeeper for financial preparation."},
  g5:{open:"$50,000 in revenue means you've built something real and repeatable. Looking back at your journey -- what's been the single biggest driver of your growth?",ctx:"You are the Arc Guide celebrating and consolidating a founder's path to $50K. Help them identify what's working, what to double down on, and what to let go of."},
  l1:{open:"One of the most meaningful things you can do now is help another founder earlier in the journey. Have you had any conversations where you've guided or mentored another founder?",ctx:"You are the Arc Guide helping a founder reflect on mentoring. Encourage specificity -- who they helped, what they shared, what the impact was."},
  l2:{open:"Accelerators and grants can provide capital, connections, and credibility. The application alone forces clarity. Have you researched any programs that might be a fit for where you are?",ctx:"You are the Arc Guide helping a founder identify and apply to accelerators or grants. Help them evaluate fit and prepare. Encourage applying even if they're unsure."},
  l3:{open:"Six months in business and still generating revenue puts you ahead of most. A lot of businesses don't make it this far. How are you feeling, and what's the biggest thing you've learned?",ctx:"You are the Arc Guide celebrating 6 months of survival. Be reflective and forward-looking. Help them articulate what they've built and what they're most proud of."},
  l4:{open:"One year. Most businesses don't make it here. You're in rare company. How does it feel? And what does year two look like from where you're standing?",ctx:"You are the Arc Guide celebrating one year in business. Be warm and celebratory. Help them capture what they've built and cast a vision for what's next."},
  l5:{open:"This is it. You started with an idea, a quiz, and a board of advisors. You did the work. You built something real. Before we mark this complete -- what did you build, and what does it mean to you?",ctx:"You are the Arc Guide for the final milestone -- AieonLabs Alumni. This is the most meaningful conversation in the entire Arc. Be present and celebratory. After they share, ask if they'd like to be featured in the AieonFounder Founder Spotlight."},
};

// -- Arc Guide Chat Overlay ----------------------------------------------------
function ChatOverlay({node, phase, savedThread, onSaveThread, onClose, onMarkComplete, isComplete}){
  var guide = ARC_GUIDE_PROMPTS[node.id] || {
    open:"Let's talk about "+node.label+". "+node.desc+" Where are you with this right now?",
    ctx:"You are the Arc Guide for AieonFounder, a warm consultant helping a founder with "+node.label+"."
  };
  var [thread, setThread] = useState(savedThread && savedThread.length > 0 ? savedThread : [{role:"assistant",content:guide.open}]);
  var [msg, setMsg] = useState("");
  var [loading, setLoading] = useState(false);
  var [exchanges, setExchanges] = useState(0);
  var [showAlumni, setShowAlumni] = useState(false);
  var [bizName, setBizName] = useState("");
  var [spotlight, setSpotlight] = useState(null);
  var endRef = useRef(null);

  useEffect(function(){
    if(endRef.current) endRef.current.scrollIntoView({behavior:"smooth"});
  },[thread, loading]);

  // Save thread whenever it updates
  useEffect(function(){
    if(onSaveThread && thread.length > 1){
      onSaveThread(node.id, thread);
    }
  },[thread]);

  var canComplete = exchanges >= 3;
  var isAlumni = node.id === "l5";

  async function send(){
    if(!msg.trim() || loading) return;
    var text = msg.trim();
    var hist = [...thread, {role:"user",content:text}];
    setThread(hist);
    setMsg("");
    setLoading(true);
    setExchanges(function(n){ return n+1; });
    try {
      var res = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-6",
          max_tokens:600,
          system: guide.ctx + " Keep responses to 2-3 short paragraphs. Ask one follow-up question. If giving legal, tax, or financial guidance always note the founder should verify with a licensed professional.",
          messages: hist.map(function(m){return {role:m.role,content:m.content};})
        })
      });
      var d = await res.json();
      var reply = d.content&&d.content[0]&&d.content[0].text || "Let me think about that...";
      setThread(function(t){ return [...t,{role:"assistant",content:reply}]; });
    } catch(e){
      setThread(function(t){ return [...t,{role:"assistant",content:"Something went wrong. Please try again."}]; });
    }
    setLoading(false);
  }

  async function finish(){
    if(isAlumni){ setShowAlumni(true); return; }
    // Generate Founder Record
    if(thread.length > 2){
      try {
        var r = await fetch("https://api.anthropic.com/v1/messages",{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({
            model:"claude-sonnet-4-6",
            max_tokens:150,
            messages:[{role:"user",content:"Summarize this founder conversation about "+node.label+" in 2-3 sentences. Include: the key decision made, the specific action committed to, any open questions. Be factual. Conversation:\n"+thread.map(function(m){return m.role+": "+m.content;}).join("\n")}]
          })
        });
        var rd = await r.json();
        var rec = rd.content&&rd.content[0]&&rd.content[0].text;
        if(rec){
          window.__founderRecord = window.__founderRecord||{};
          window.__founderRecord[node.id]={milestone:node.label,record:rec,date:new Date().toLocaleDateString()};
        }
      } catch(e){}
    }
    onMarkComplete(node.id);
    onClose();
  }

  function submitAlumni(){
    window.__founderRecord = window.__founderRecord||{};
    window.__founderRecord[node.id]={milestone:node.label,businessName:bizName,spotlight:spotlight,date:new Date().toLocaleDateString()};
    onMarkComplete(node.id);
    onClose();
  }

  return(
    <div style={{position:"fixed",inset:0,zIndex:500,display:"flex",flexDirection:"column",fontFamily:"system-ui,sans-serif",background:"#f8faff"}}>
      {/* Header */}
      <div style={{background:"linear-gradient(135deg,#060d1f,#0d1f4e)",padding:"13px 20px",display:"flex",alignItems:"center",gap:14,flexShrink:0,borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
        <button onClick={onClose} style={{display:"flex",alignItems:"center",gap:6,background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:8,padding:"7px 14px",color:"rgba(255,255,255,0.8)",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit",flexShrink:0,whiteSpace:"nowrap"}}>
          <- Founder Arc
        </button>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:10,color:phase.color,letterSpacing:2,textTransform:"uppercase",fontFamily:"monospace"}}>{phase.label} Phase</div>
          <div style={{fontSize:14,fontWeight:700,color:"#fff",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{node.label}</div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:6,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:20,padding:"5px 12px",flexShrink:0}}>
          <span style={{fontSize:12}}>[compass]</span>
          <span style={{fontSize:11,color:"rgba(255,255,255,0.6)"}}>Arc Guide</span>
        </div>
      </div>
      {/* Disclaimer */}
      <div style={{background:"#fffbeb",borderBottom:"1px solid #fde68a",padding:"7px 20px",display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
        <span style={{fontSize:12,flexShrink:0}}>!</span>
        <span style={{fontSize:11,color:"#92400e",lineHeight:1.4}}>AI guidance only. Always verify legal, tax, and financial decisions with a licensed professional before acting.</span>
      </div>
      {/* Thread */}
      <div style={{flex:1,overflowY:"auto",padding:"20px",maxWidth:720,width:"100%",margin:"0 auto",boxSizing:"border-box"}}>
        {thread.map(function(m,i){
          var ai = m.role==="assistant";
          return(
            <div key={i} style={{marginBottom:16,display:"flex",gap:10,flexDirection:ai?"row":"row-reverse",animation:"fadeUp 0.3s ease"}}>
              {ai&&(
                <div style={{width:34,height:34,borderRadius:10,background:"linear-gradient(135deg,"+phase.color+"22,"+phase.color+"08)",border:"1.5px solid "+phase.color+"33",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:16}}>[compass]</div>
              )}
              <div style={{maxWidth:"78%",background:ai?"#fff":phase.color,borderRadius:ai?"4px 16px 16px 16px":"16px 4px 16px 16px",padding:"12px 16px",border:ai?"1px solid #e2e8f0":"none",boxShadow:ai?"0 2px 12px rgba(0,0,0,0.06)":"0 2px 12px "+phase.color+"44"}}>
                {i===0&&ai&&<div style={{fontSize:10,color:phase.color,fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>Arc Guide</div>}
                <div style={{fontSize:14,color:ai?"#1e293b":"#fff",lineHeight:1.75,whiteSpace:"pre-wrap"}}>{m.content}</div>
              </div>
            </div>
          );
        })}
        {loading&&(
          <div style={{display:"flex",gap:10,marginBottom:16}}>
            <div style={{width:34,height:34,borderRadius:10,background:"linear-gradient(135deg,"+phase.color+"22,"+phase.color+"08)",border:"1.5px solid "+phase.color+"33",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>[compass]</div>
            <div style={{background:"#fff",borderRadius:"4px 16px 16px 16px",padding:"14px 18px",border:"1px solid #e2e8f0"}}>
              <div style={{display:"flex",gap:5,alignItems:"center"}}>
                {[0,1,2].map(function(j){return(
                  <div key={j} style={{width:7,height:7,borderRadius:"50%",background:phase.color,opacity:0.7,animation:"blink 1.2s ease-in-out "+(j*0.2)+"s infinite"}}/>
                );})}
              </div>
            </div>
          </div>
        )}
        {showAlumni&&(
          <div style={{background:"linear-gradient(135deg,#060d1f,#0d1f4e)",borderRadius:20,padding:"28px",marginTop:8,border:"1px solid rgba(0,212,200,0.25)",animation:"fadeUp 0.4s ease"}}>
            <div style={{fontSize:10,color:"#00d4c8",letterSpacing:3,textTransform:"uppercase",fontFamily:"monospace",marginBottom:12}}>AieonLabs Founder Spotlight</div>
            <div style={{fontSize:18,fontWeight:800,color:"#fff",marginBottom:8}}>You built something real.</div>
            <div style={{fontSize:13,color:"rgba(255,255,255,0.55)",lineHeight:1.7,marginBottom:24}}>We'd love to feature your business in the AieonFounder Founder Spotlight -- shared with the community as proof that the journey is real.</div>
            <div style={{marginBottom:14}}>
              <div style={{fontSize:12,color:"rgba(255,255,255,0.55)",marginBottom:6,fontWeight:600}}>What's the name of your business?</div>
              <input value={bizName} onChange={function(e){setBizName(e.target.value);}} placeholder="Your business name..." style={{width:"100%",padding:"11px 14px",borderRadius:10,border:"1.5px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"#fff",fontSize:14,boxSizing:"border-box"}}/>
            </div>
            <div style={{marginBottom:22}}>
              <div style={{fontSize:12,color:"rgba(255,255,255,0.55)",marginBottom:8,fontWeight:600}}>Would you like to be featured?</div>
              <div style={{display:"flex",gap:8}}>
                <button onClick={function(){setSpotlight(true);}} style={{flex:1,padding:"11px",borderRadius:10,border:"1.5px solid "+(spotlight===true?"#00d4c8":"rgba(255,255,255,0.12)"),background:spotlight===true?"rgba(0,212,200,0.12)":"transparent",color:spotlight===true?"#00d4c8":"rgba(255,255,255,0.55)",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit",transition:"all 0.15s"}}>Yes, feature me</button>
                <button onClick={function(){setSpotlight(false);}} style={{flex:1,padding:"11px",borderRadius:10,border:"1.5px solid "+(spotlight===false?"rgba(255,255,255,0.3)":"rgba(255,255,255,0.12)"),background:spotlight===false?"rgba(255,255,255,0.06)":"transparent",color:"rgba(255,255,255,0.55)",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit",transition:"all 0.15s"}}>Keep me private</button>
              </div>
            </div>
            {bizName.trim()&&spotlight!==null&&(
              <button onClick={submitAlumni} style={{width:"100%",padding:"14px",borderRadius:12,background:"linear-gradient(135deg,#00d4c8,#1a56db)",color:"#fff",border:"none",fontSize:15,fontWeight:800,cursor:"pointer",fontFamily:"inherit",letterSpacing:"-0.3px"}}>
                Mark Complete -- Welcome to AieonLabs Alumni *
              </button>
            )}
          </div>
        )}
        <div ref={endRef}/>
      </div>
      {/* Input */}
      {!showAlumni&&(
        <div style={{borderTop:"1px solid #e2e8f0",background:"#fff",padding:"12px 20px",flexShrink:0}}>
          <div style={{maxWidth:720,margin:"0 auto"}}>
            {exchanges>0&&!canComplete&&(
              <div style={{fontSize:11,color:"#94a3b8",textAlign:"center",marginBottom:8}}>{3-exchanges} more response{3-exchanges===1?"":"s"} to unlock completion</div>
            )}
            <div style={{display:"flex",gap:8,alignItems:"flex-end"}}>
              <textarea value={msg} onChange={function(e){setMsg(e.target.value);}} onKeyDown={function(e){if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}} placeholder={"Chat with your Arc Guide about "+node.label+"..."} rows={2} style={{flex:1,padding:"10px 14px",borderRadius:12,border:"1.5px solid #e2e8f0",fontSize:14,lineHeight:1.5,color:"#1e293b",background:"#f8faff"}}/>


              <div style={{display:"flex",flexDirection:"column",gap:6,flexShrink:0}}>
                <button onClick={send} disabled={!msg.trim()||loading} style={{padding:"10px 18px",borderRadius:10,background:msg.trim()&&!loading?phase.color:"#e2e8f0",color:msg.trim()&&!loading?"#fff":"#94a3b8",border:"none",fontSize:13,fontWeight:700,cursor:msg.trim()&&!loading?"pointer":"default",fontFamily:"inherit",whiteSpace:"nowrap",transition:"all 0.15s"}}>
                  Send ->
                </button>
                {canComplete&&!isComplete&&!isAlumni&&(
                  <button onClick={finish} style={{padding:"10px 18px",borderRadius:10,background:"#059669",color:"#fff",border:"none",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap"}}>
                    v Done
                  </button>
                )}
                {canComplete&&isAlumni&&!showAlumni&&(
                  <button onClick={function(){setShowAlumni(true);}} style={{padding:"10px 18px",borderRadius:10,background:"linear-gradient(135deg,#00d4c8,#1a56db)",color:"#fff",border:"none",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap"}}>
                    * Complete
                  </button>
                )}
              </div>
            </div>
            {isComplete&&<div style={{marginTop:8,textAlign:"center",fontSize:12,color:"#059669",fontWeight:600}}>v Milestone complete</div>}
          </div>
        </div>
      )}
    </div>
  );
}

// -- Single milestone node -----------------------------------------------------
function MilestoneNode({node, phase, done, isActive, isLast, isIgnite, onSelect, onUpgradeClick, onChat}){
  var inProgress = isActive && !done && isIgnite;
  return(
    <div style={{borderBottom:isLast?"none":"1px solid #f1f5f9",transition:"background 0.2s"}}>
      <div onClick={function(){isIgnite?onSelect():onUpgradeClick();}} style={{padding:"14px 18px",display:"flex",alignItems:"center",gap:14,cursor:"pointer", background:inProgress?"rgba(26,86,219,0.03)":"transparent", borderLeft:done?"3px solid "+phase.color:inProgress?"3px solid "+phase.color+"88":"3px solid transparent", transition:"all 0.2s"}}>





        {/* Bubble */}
        <div style={{width:34,height:34,borderRadius:"50%",flexShrink:0, display:"flex",alignItems:"center",justifyContent:"center", background:done?"linear-gradient(135deg,"+phase.color+","+phase.color+"cc)":inProgress?"rgba(26,86,219,0.1)":"#f8faff", border:"2px solid "+(done?phase.color:inProgress?phase.color:"#e2e8f0"), transition:"all 0.3s", overflow:"hidden", boxShadow:inProgress?"0 0 0 4px "+phase.color+"18":"none"}}>








          {done
            ? <img src={AIEON_LOGO_B64} alt="" style={{width:22,height:22,objectFit:"contain",filter:"brightness(10)"}}/>
            : inProgress
              ? <div style={{width:10,height:10,borderRadius:"50%",background:phase.color,animation:"pulse 2s infinite"}}/>
              : <span style={{fontSize:11,color:"#cbd5e1"}}>{isIgnite?"":"[lock]"}</span>
          }
        </div>
        {/* Text */}
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:14,fontWeight:600,color:done?phase.color:inProgress?"#0f172a":"#334155",lineHeight:1.3}}>{node.label}</div>
          <div style={{fontSize:12,color:"#94a3b8",marginTop:2,lineHeight:1.4}}>{node.desc}</div>
        </div>
        {/* Status badge */}
        {done&&<div style={{fontSize:11,color:phase.color,background:phase.color+"12",border:"1px solid "+phase.color+"25",borderRadius:20,padding:"3px 10px",fontWeight:700,flexShrink:0,whiteSpace:"nowrap"}}>v Done</div>}
        {inProgress&&!done&&<div style={{fontSize:11,color:phase.color,fontWeight:700,flexShrink:0,whiteSpace:"nowrap"}}>In progress</div>}
        {!isIgnite&&<span style={{fontSize:14,flexShrink:0}}>[lock]</span>}
      </div>
      {/* Get Started button */}
      {isActive&&isIgnite&&!done&&(
        <div style={{padding:"6px 18px 14px",paddingLeft:66}}>
          <button onClick={function(e){e.stopPropagation();onChat();}} style={{display:"inline-flex",alignItems:"center",gap:8,padding:"9px 20px",borderRadius:10, background:"linear-gradient(135deg,"+phase.color+","+phase.color+"cc)", color:"#fff",border:"none",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit", boxShadow:"0 4px 16px "+phase.color+"44",transition:"all 0.15s"}}>





            [compass] Get Started with Arc Guide
          </button>
        </div>
      )}
      {/* Review button if done */}
      {isActive&&isIgnite&&done&&(
        <div style={{padding:"6px 18px 12px",paddingLeft:66}}>
          <button onClick={function(e){e.stopPropagation();onChat();}} style={{display:"inline-flex",alignItems:"center",gap:6,padding:"7px 16px",borderRadius:10, background:"rgba(5,150,105,0.08)",color:"#059669",border:"1px solid rgba(5,150,105,0.2)", fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>




            Review conversation
          </button>
        </div>
      )}
    </div>
  );
}

// -- Phase accordion -----------------------------------------------------------
function PhaseAccordion({phase, completed, activeNode, setActiveNode, onComplete, isIgnite, onUpgradeClick}){
  var [open, setOpen] = useState(false);
  var [chatNode, setChatNode] = useState(null);
  var [savedThreads, setSavedThreads] = useState({});
  var done = phase.nodes.filter(function(n){return !!completed[n.id];}).length;
  var total = phase.nodes.length;
  var pct = Math.round((done/total)*100);

  return(
    <div style={{marginBottom:10,borderRadius:16,border:"1.5px solid #e2e8f0",overflow:"hidden",boxShadow:"0 2px 12px rgba(0,0,0,0.04)",background:"#fff"}}>
      {/* Chat overlay */}
      {chatNode&&(
        <ChatOverlay
          node={chatNode}
          phase={phase}
          savedThread={savedThreads[chatNode.id]}
          onSaveThread={function(id,thread){setSavedThreads(function(prev){var n={};Object.keys(prev).forEach(function(k){n[k]=prev[k];});n[id]=thread;return n;});}}
          onClose={function(){setChatNode(null);}}
          onMarkComplete={function(id){onComplete(id);setChatNode(null);}}
          isComplete={!!completed[chatNode.id]}
        />
      )}
      {/* Phase header */}
      <div onClick={function(){setOpen(function(o){return !o;});}} style={{padding:"16px 18px",display:"flex",alignItems:"center",gap:14,cursor:"pointer", background:open?"linear-gradient(135deg,"+phase.color+"0a,"+phase.color+"04)":"#fff", borderBottom:open?"1.5px solid "+phase.color+"18":"none", transition:"all 0.2s"}}>





        <div style={{fontSize:22,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",width:28,height:28}}>
          {phase.icon==="AIEON_LOGO"
            ? <img src={AIEON_LOGO_B64} alt="Legacy" style={{width:24,height:24,objectFit:"contain"}}/>
            : phase.icon}
        </div>
        <div style={{flex:1}}>
          <div style={{fontSize:15,fontWeight:700,color:"#0f172a"}}>{phase.label}</div>
          <div style={{fontSize:12,color:"#94a3b8",marginTop:1}}>{done} of {total} complete</div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:64,height:5,background:"#f1f5f9",borderRadius:3,overflow:"hidden"}}>
            <div style={{height:"100%",width:pct+"%",background:"linear-gradient(90deg,"+phase.color+","+phase.color+"bb)",borderRadius:3,transition:"width 0.5s ease"}}/>
          </div>
          <div style={{fontSize:12,color:phase.color,fontWeight:700,minWidth:32,textAlign:"right"}}>{pct}%</div>
          <div style={{fontSize:12,color:"#94a3b8",transition:"transform 0.2s",transform:open?"rotate(180deg)":"rotate(0)"}}>v</div>
        </div>
      </div>
      {/* Nodes */}
      {open&&(
        <div style={{animation:"fadeUp 0.2s ease"}}>
          {phase.nodes.map(function(node,i){
            var isBlurred = !isIgnite && i > 0;
            return(
              <div key={node.id} style={{position:"relative"}}>
                <MilestoneNode
                  node={node}
                  phase={phase}
                  done={!!completed[node.id]}
                  isActive={activeNode===node.id}
                  isLast={i===phase.nodes.length-1}
                  isIgnite={isIgnite}
                  onSelect={function(){isBlurred?onUpgradeClick():setActiveNode(activeNode===node.id?null:node.id);}}
                  onUpgradeClick={onUpgradeClick}
                  onChat={function(){setChatNode(node);}}
                />
                {isBlurred&&(
                  <div onClick={onUpgradeClick} style={{position:"absolute",inset:0,backdropFilter:"blur(3px)",WebkitBackdropFilter:"blur(3px)",background:"rgba(248,250,255,0.6)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",zIndex:10}}>
                    <div style={{display:"flex",alignItems:"center",gap:6,background:"#fff",border:"1px solid #e2e8f0",borderRadius:20,padding:"5px 12px",boxShadow:"0 2px 8px rgba(0,0,0,0.08)"}}>
                      <span style={{fontSize:11}}>[lock]</span>
                      <span style={{fontSize:11,color:"#1a56db",fontWeight:700}}>Ignite</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}


function FounderArc({tier,onUpgradeClick,lockedIdea,answers}){
  var [completed,setCompleted] = useState({});
  var [activeNode,setActiveNode] = useState(null);
  var isIgnite = tier==="ignite";
  var total = ARC_PATHWAYS.reduce(function(s,p){return s+p.nodes.length;},0);
  var done = Object.values(completed).filter(Boolean).length;
  var pct = Math.round((done/total)*100);

  function markComplete(id){
    setCompleted(function(prev){
      var next={};
      Object.keys(prev).forEach(function(k){next[k]=prev[k];});
      next[id]=true;
      return next;
    });
    setActiveNode(null);
  }

  return(
    <div style={{fontFamily:"system-ui,sans-serif"}}>
      {/* Hero */}
      <div style={{background:"linear-gradient(160deg,#060d1f,#0d1f4e)",padding:"48px 24px 48px",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <ArcSparks/>
        {[180,240,300].map(function(r,i){return(
          <div key={i} style={{position:"absolute",top:"50%",left:"50%",width:r,height:r,marginLeft:-r/2,marginTop:-r/2,borderRadius:"50%",border:"1px solid rgba(59,110,248,"+(0.12-i*0.03)+")",pointerEvents:"none"}}/>
        );})}
        <div style={{position:"relative",zIndex:2}}>
          <div style={{animation:"arcFloat 4.5s ease-in-out infinite",display:"inline-block",marginBottom:20}}>
            <div style={{position:"relative",display:"inline-block"}}>
              <div style={{position:"absolute",inset:-20,borderRadius:"50%",background:"radial-gradient(circle,rgba(26,86,219,0.35) 0%,transparent 70%)",filter:"blur(12px)"}}/>
              <div style={{width:80,height:80,borderRadius:20,background:"linear-gradient(135deg,rgba(26,86,219,0.3),rgba(0,212,200,0.2))",border:"1.5px solid rgba(59,110,248,0.4)",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",boxShadow:"0 0 32px rgba(26,86,219,0.5)"}}>
                <img src={AIEON_LOGO_B64} alt="AieonFounder" style={{width:52,height:52,objectFit:"contain",filter:"drop-shadow(0 0 8px rgba(0,212,200,0.8))"}}/>
              </div>
            </div>
          </div>
          <div style={{fontSize:10,color:"#3b6ef8",letterSpacing:4,textTransform:"uppercase",fontFamily:"monospace",marginBottom:10}}>Founder Arc</div>
          <div style={{fontSize:"clamp(22px,4vw,32px)",fontWeight:900,color:"#fff",marginBottom:10,letterSpacing:"-0.5px"}}>
            {isIgnite?"Your path from idea to legacy.":"Unlock your path from idea to legacy."}
          </div>
          <div style={{fontSize:14,color:"rgba(255,255,255,0.5)",maxWidth:440,margin:"0 auto",lineHeight:1.7}}>
            {isIgnite
              ?"25 milestones. Each one opens a real consultation with your Arc Guide. Do the work. Mark it complete. Watch the logo appear."
              :"25 milestones across 5 phases -- Formation through Legacy. Each guided by AI. Ignite unlocks everything."}
          </div>
          {isIgnite&&(
            <div style={{marginTop:24,display:"inline-flex",alignItems:"center",gap:16,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:20,padding:"10px 24px"}}>
              <div style={{fontSize:13,color:"rgba(255,255,255,0.45)"}}>Progress</div>
              <div style={{width:140,height:6,background:"rgba(255,255,255,0.08)",borderRadius:3,overflow:"hidden"}}>
                <div style={{height:"100%",width:pct+"%",background:"linear-gradient(90deg,#3b6ef8,#00d4c8)",borderRadius:3,transition:"width 0.6s ease"}}/>
              </div>
              <div style={{fontSize:15,fontWeight:800,color:"#00d4c8"}}>{done}/{total}</div>
            </div>
          )}
          {!isIgnite&&(
            <button onClick={onUpgradeClick} style={{marginTop:24,padding:"13px 32px",borderRadius:12,background:"linear-gradient(135deg,#1a56db,#3b82f6)",color:"#fff",border:"none",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"inherit",boxShadow:"0 8px 32px rgba(26,86,219,0.5)"}}>
              Unlock Founder Arc -- Ignite
            </button>
          )}
        </div>
      </div>
      {/* Phases */}
      <div style={{maxWidth:700,margin:"0 auto",padding:"24px 16px 48px"}}>
        {!isIgnite&&(
          <div style={{display:"flex",alignItems:"center",gap:10,padding:"12px 16px",background:"#eff6ff",border:"1px solid #bfdbfe",borderRadius:12,marginBottom:16,fontSize:13,color:"#1e40af"}}>
            <span>[lock]</span>
            <span style={{flex:1}}>Upgrade to Ignite to unlock all 25 milestones and Arc Guide consultations.</span>
            <button onClick={onUpgradeClick} style={{padding:"5px 14px",borderRadius:8,background:"#1a56db",color:"#fff",border:"none",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit",flexShrink:0}}>Upgrade</button>
          </div>
        )}
        {ARC_PATHWAYS.map(function(phase){
          return(
            <PhaseAccordion
              key={phase.id}
              phase={phase}
              completed={completed}
              activeNode={activeNode}
              setActiveNode={setActiveNode}
              onComplete={markComplete}
              isIgnite={isIgnite}
              onUpgradeClick={onUpgradeClick}
            />
          );
        })}
        {isIgnite&&done===total&&(
          <div style={{textAlign:"center",marginTop:32,padding:"32px",background:"linear-gradient(135deg,#060d1f,#0d1f4e)",borderRadius:20,border:"1px solid rgba(0,212,200,0.3)"}}>
            <div style={{fontSize:10,color:"#00d4c8",letterSpacing:4,textTransform:"uppercase",fontFamily:"monospace",marginBottom:12}}>Arc Complete</div>
            <div style={{fontSize:24,fontWeight:900,color:"#fff",marginBottom:8}}>You built it. All 25 milestones.</div>
            <div style={{fontSize:14,color:"rgba(255,255,255,0.5)"}}>Welcome to AieonLabs Alumni.</div>
          </div>
        )}
        <div style={{marginTop:20,padding:"12px 16px",background:"#f8faff",borderRadius:10,border:"1px solid #e2e8f0",fontSize:11,color:"#64748b",lineHeight:1.6}}>
          <strong style={{color:"#0f172a"}}>Notice:</strong> Arc Guide conversations are AI-generated and for informational purposes only. Always verify legal, tax, financial, and business decisions with licensed professionals.
        </div>
      </div>
    </div>
  );
}


// -- Ignite Activation Modal --------------------------------------------------
// -- Ignite modal trigger (rendered by standalone AieonFounder_IgniteModal)
function IgniteModal({onClose}){
  useEffect(function(){
    if(window.__openIgniteModal) window.__openIgniteModal("ignite", onClose);
  },[]);
  return null;
}
function IgniteProModal({onClose}){
  useEffect(function(){
    if(window.__openIgniteModal) window.__openIgniteModal("pro", onClose);
  },[]);
  return null;
}

function UpgradeModal({onClose,onUpgrade}){
  const featureRows=[
    {icon:"[chat]",title:"Board Debate",desc:"Push back on any advisor. They respond in character and hold their position -- a real second opinion."},
    {icon:"[map]",title:"30-Day Action Roadmap",desc:"A week-by-week launch plan auto-generated after your session. Week 1 starts today."},
    {icon:"[search]",title:"Competitive Blindspot Report",desc:"3 gaps your competitors missed, matched to your exact idea. Advantage found before you spend a dollar."},
    {icon:"Z",title:"Full Founder Arc",desc:"All 25 milestones across 5 phases -- Formation through Legacy -- with AI guidance and badges at every step."},
    {icon:"[cal]",title:"Daily Pulse",desc:"One anonymous community prompt per day -- feeling, action, or discussion. +15 XP every response."},
    {icon:"[mail]",title:"Review Drop Box",desc:"Submit your pitch, copy, pricing, or business plan. AI board reviews it. Request a human review from AieonLabs team."},
    {icon:"[target]",title:"XP, Badges & Loyalty Rewards",desc:"Every action earns XP. Unlock badges, climb levels, and qualify for free Ignite months and early Pro access."},
    {icon:"[seed]",title:"Early Access Intelligence",desc:"Grants, competitions, and accelerators filtered to your exact profile -- before the deadline."},
  ];
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(8,15,43,0.92)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16,overflowY:"auto"}}>
      <div style={{background:"#fff",borderRadius:20,maxWidth:500,width:"100%",overflow:"hidden",boxShadow:"0 24px 80px rgba(0,0,0,0.4)",margin:"auto"}}>
        <div style={{background:"linear-gradient(135deg,#060d1f,#0d1f4e)",padding:"28px 28px 22px",position:"relative",overflow:"hidden",textAlign:"center"}}>
          {[{l:"8%",t:"20%",s:2,bg:"#00d4c8",dur:"2.6s",del:"0s"},{l:"88%",t:"30%",s:3,bg:"#3b6ef8",dur:"3.1s",del:"0.5s"},{l:"15%",t:"75%",s:2,bg:"#5588ff",dur:"2.4s",del:"1.0s"},{l:"80%",t:"70%",s:3,bg:"#00f0e0",dur:"3.3s",del:"1.5s"},{l:"50%",t:"10%",s:2,bg:"#00d4c8",dur:"2.9s",del:"0.8s"},{l:"92%",t:"55%",s:3,bg:"#3b6ef8",dur:"3.2s",del:"1.2s"}].map(function(sp,i){ return(
            <div key={i} style={{position:"absolute",left:sp.l,top:sp.t,width:sp.s,height:sp.s,background:sp.bg,borderRadius:"50%",animation:"arcSpark "+sp.dur+" linear "+sp.del+" infinite",opacity:0,pointerEvents:"none"}}/>
          ); })}
          <div style={{animation:"arcFloat 4.5s ease-in-out infinite",display:"inline-block",marginBottom:12,position:"relative",zIndex:1}}>
            <div style={{position:"relative",display:"inline-block"}}>
              <div style={{position:"absolute",inset:-16,borderRadius:"50%",background:"radial-gradient(circle,rgba(59,110,248,0.35) 0%,rgba(0,212,200,0.15) 45%,transparent 70%)",filter:"blur(10px)"}}/>
              <img src={AIEON_LOGO_B64} alt="AieonLabs" style={{width:64,height:64,objectFit:"contain",position:"relative",zIndex:1,filter:"drop-shadow(0 0 10px rgba(59,110,248,0.9)) drop-shadow(0 0 20px rgba(0,212,200,0.6))"}}/>
            </div>
          </div>
          <div style={{position:"relative",zIndex:1}}>
            <div style={{fontSize:10,color:"#3b6ef8",letterSpacing:3,textTransform:"uppercase",fontFamily:"monospace",marginBottom:6}}>Unlock the Full Experience</div>
            <div style={{fontSize:22,color:"#fff",fontWeight:800,marginBottom:4}}>AieonFounder Ignite</div>
            <div style={{fontSize:14,color:"rgba(255,255,255,0.55)"}}>Everything in Free, plus the tools that separate founders who think from founders who build.</div>
          </div>
        </div>
        <div style={{padding:"20px 28px"}}>
          {featureRows.map(function(f,i){ return(
            <div key={i} style={{display:"flex",gap:14,marginBottom:i<featureRows.length-1?16:0,paddingBottom:i<featureRows.length-1?16:0,borderBottom:i<featureRows.length-1?"1px solid #f1f5f9":"none"}}>
              <div style={{width:36,height:36,borderRadius:10,background:"#eff6ff",border:"1.5px solid #bfdbfe",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{f.icon}</div>
              <div>
                <div style={{fontWeight:700,color:"#0f172a",fontSize:14,marginBottom:2}}>{f.title}</div>
                <div style={{fontSize:13,color:"#64748b",lineHeight:1.5}}>{f.desc}</div>
              </div>
            </div>
          ); })}
        </div>
        <div style={{padding:"0 28px 24px"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,padding:"12px 16px",background:"#eff6ff",borderRadius:12,border:"1px solid #bfdbfe"}}>
            <div>
              <div style={{fontWeight:800,color:"#0f172a",fontSize:18}}>{"$39"}<span style={{fontSize:13,fontWeight:400,color:"#64748b"}}>/month</span></div>
              <div style={{fontSize:12,color:"#64748b"}}>or $249/year -- save 47%</div>
            </div>
            <div style={{fontSize:12,color:"#1a56db",fontWeight:600}}>Cancel anytime</div>
          </div>
          <button onClick={onUpgrade} style={{width:"100%",background:"linear-gradient(135deg,#1a56db,#3b82f6)",color:"#fff",border:"none",borderRadius:12,padding:"14px",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:"inherit",marginBottom:10}}>
            Upgrade to Ignite
          </button>
          <button onClick={onClose} style={{width:"100%",background:"none",color:"#94a3b8",border:"none",fontSize:13,cursor:"pointer",fontFamily:"inherit",padding:"4px"}}>
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}


function EmailGate({email,setEmail,error,submitting,onSubmit,onSkip,answers,mbtiType}){
  const sparks=[
    {l:"8%",t:"15%",s:3,bg:"#00d4c8",dur:"2.6s",del:"0s"},
    {l:"88%",t:"25%",s:4,bg:"#3b6ef8",dur:"3.1s",del:"0.5s"},
    {l:"15%",t:"72%",s:2,bg:"#5588ff",dur:"2.4s",del:"1.0s"},
    {l:"80%",t:"68%",s:3,bg:"#00f0e0",dur:"3.3s",del:"1.5s"},
    {l:"45%",t:"8%",s:4,bg:"#00d4c8",dur:"2.9s",del:"0.8s"},
    {l:"93%",t:"50%",s:2,bg:"#3b6ef8",dur:"3.2s",del:"1.2s"},
    {l:"4%",t:"52%",s:3,bg:"#00d4c8",dur:"2.7s",del:"0.3s"},
    {l:"55%",t:"88%",s:4,bg:"#5588ff",dur:"3.4s",del:"1.8s"},
    {l:"28%",t:"30%",s:2,bg:"#3b6ef8",dur:"2.5s",del:"2.1s"},
    {l:"70%",t:"12%",s:3,bg:"#00d4c8",dur:"2.8s",del:"0.6s"},
    {l:"38%",t:"60%",s:4,bg:"#3b6ef8",dur:"3.0s",del:"1.9s"},
    {l:"75%",t:"42%",s:2,bg:"#00f0e0",dur:"2.6s",del:"2.5s"},
  ];

  const capital=answers?.capital||"your budget";
  const loc=answers?.location?.text||"your area";
  const mbtiLabel=mbtiType?"You tested as "+mbtiType+" -- ":"";

  return(
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#060d1f,#0d1f4e)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"24px 20px",position:"relative",overflow:"hidden",fontFamily:"system-ui,sans-serif"}}>

      {/* Sparks */}
      {sparks.map(function(sp,i){ return(
        <div key={i} style={{position:"absolute",left:sp.l,top:sp.t,width:sp.s,height:sp.s,background:sp.bg,borderRadius:"50%",animation:"arcSpark "+sp.dur+" linear "+sp.del+" infinite",opacity:0,pointerEvents:"none"}}/>
      ); })}

      {/* Rings */}
      {[200,280,360].map(function(r,i){ return(
        <div key={i} style={{position:"absolute",width:r,height:r,borderRadius:"50%",border:"1px solid rgba(59,130,246,"+(0.15-i*0.04)+")",animation:"arcRing "+(3.5+i*0.8)+"s ease-in-out "+(i*1.3)+"s infinite",pointerEvents:"none"}}/>
      ); })}

      {/* Logo */}
      <div style={{animation:"arcFloat 4.5s ease-in-out infinite",marginBottom:28,position:"relative",zIndex:2}}>
        <div style={{position:"relative",display:"inline-block"}}>
          <div style={{position:"absolute",inset:-24,borderRadius:"50%",background:"radial-gradient(circle,rgba(59,110,248,0.4) 0%,rgba(0,212,200,0.2) 45%,transparent 70%)",filter:"blur(14px)"}}/>
          <img src={AIEON_LOGO_B64} alt="AieonLabs" style={{width:90,height:90,objectFit:"contain",position:"relative",zIndex:1,filter:"drop-shadow(0 0 12px rgba(59,110,248,0.95)) drop-shadow(0 0 28px rgba(0,212,200,0.65)) drop-shadow(0 0 48px rgba(59,110,248,0.4))"}}/>
        </div>
      </div>

      {/* Card */}
      <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:24,padding:"36px 32px",maxWidth:480,width:"100%",position:"relative",zIndex:2,backdropFilter:"blur(12px)"}}>

        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{fontSize:10,color:"#3b6ef8",letterSpacing:4,textTransform:"uppercase",fontFamily:"monospace",marginBottom:12}}>One Last Thing</div>
          <h2 style={{fontSize:"clamp(22px,4vw,28px)",fontWeight:900,color:"#fff",margin:"0 0 12px",lineHeight:1.2}}>
            Save your session before we generate your ideas.
          </h2>
          <p style={{fontSize:14,color:"rgba(255,255,255,0.55)",lineHeight:1.7,margin:0}}>
            {mbtiLabel}we've built your profile around {capital} in {loc}. Drop your email and we'll send you everything -- your ScoreCard, ideas, Board session, and Roadmap -- so nothing disappears when you close the tab.
          </p>
        </div>

        {/* What they get */}
        <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:24}}>
          {[
            {icon:"[chart]",text:"Your Founder ScoreCard"},
            {icon:"[fire]",text:"5 AI-generated business ideas"},
            {icon:"[suit]",text:"Full Board of 5 advisor session"},
            {icon:"[map]",text:"30-day action roadmap (Ignite)"},
          ].map(function(item,i){ return(
            <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",background:"rgba(59,130,246,0.08)",borderRadius:10,border:"1px solid rgba(59,130,246,0.15)"}}>
              <span style={{fontSize:16}}>{item.icon}</span>
              <span style={{fontSize:13,color:"rgba(255,255,255,0.7)",fontWeight:500}}>{item.text}</span>
            </div>
          ); })}
        </div>

        {/* Email input */}
        <div style={{marginBottom:8}}>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!submitting)onSubmit();}} placeholder="your@email.com" style={{width:"100%",padding:"14px 16px",borderRadius:12,border:"1.5px solid "+(error?"#ef4444":"rgba(255,255,255,0.15)"),background:"rgba(255,255,255,0.06)",color:"#fff",fontSize:15,fontFamily:"inherit",outline:"none",boxSizing:"border-box",transition:"border 0.2s"}} />







          {error&&<div style={{fontSize:12,color:"#f87171",marginTop:6,paddingLeft:4}}>{error}</div>}
        </div>

        <button
          onClick={onSubmit}
          disabled={submitting}
          style={{width:"100%",padding:"14px",borderRadius:12,background:submitting?"rgba(59,130,246,0.4)":"linear-gradient(135deg,#1a56db,#00d4c8)",color:"#fff",border:"none",fontSize:15,fontWeight:700,cursor:submitting?"default":"pointer",fontFamily:"inherit",marginBottom:12,transition:"all 0.2s",boxShadow:submitting?"none":"0 6px 24px rgba(59,130,246,0.4)"}}>
          {submitting?"Saving your session...":"Save & Generate My Ideas ->"}
        </button>

        <div style={{textAlign:"center"}}>
          <button
            onClick={onSkip}
            style={{background:"none",border:"none",color:"rgba(255,255,255,0.4)",fontSize:12,cursor:"pointer",fontFamily:"inherit",padding:"4px 8px"}}>
            Skip for now -- generate without saving
          </button>
        </div>

        <div style={{marginTop:20,paddingTop:16,borderTop:"1px solid rgba(255,255,255,0.06)",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
          <span style={{fontSize:11,color:"rgba(255,255,255,0.5)"}}>[lock] Free forever * No spam * Unsubscribe anytime * Your data stays private</span>
        </div>
      </div>
    </div>
  );
}


function DemoIntroModal({onSkipQuiz,onJumpToIdeas,onCancel}){
  const sparks=[
    {l:"8%",t:"20%",s:2,bg:"#00d4c8",dur:"2.6s",del:"0s"},
    {l:"88%",t:"30%",s:3,bg:"#3b6ef8",dur:"3.1s",del:"0.5s"},
    {l:"15%",t:"75%",s:2,bg:"#5588ff",dur:"2.4s",del:"1.0s"},
    {l:"80%",t:"70%",s:2,bg:"#00f0e0",dur:"3.3s",del:"1.5s"},
    {l:"50%",t:"10%",s:3,bg:"#00d4c8",dur:"2.9s",del:"0.8s"},
    {l:"92%",t:"55%",s:2,bg:"#3b6ef8",dur:"3.2s",del:"1.2s"},
  ];
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(6,13,31,0.92)",zIndex:2000,display:"flex",alignItems:"center",justifyContent:"center",padding:20,fontFamily:"system-ui,sans-serif"}}>
      <div style={{background:"linear-gradient(160deg,#060d1f,#0d1f4e)",borderRadius:24,maxWidth:420,width:"100%",overflow:"hidden",boxShadow:"0 24px 80px rgba(0,0,0,0.6)",border:"1px solid rgba(59,130,246,0.2)",position:"relative"}}>
        {sparks.map(function(sp,i){ return(
          <div key={i} style={{position:"absolute",left:sp.l,top:sp.t,width:sp.s,height:sp.s,background:sp.bg,borderRadius:"50%",animation:"arcSpark "+sp.dur+" linear "+sp.del+" infinite",opacity:0,pointerEvents:"none"}}/>
        ); })}
        <div style={{padding:"32px 28px 24px",textAlign:"center",position:"relative",zIndex:1}}>
          <div style={{animation:"arcFloat 4.5s ease-in-out infinite",display:"inline-block",marginBottom:16}}>
            <div style={{position:"relative",display:"inline-block"}}>
              <div style={{position:"absolute",inset:-16,borderRadius:"50%",background:"radial-gradient(circle,rgba(59,110,248,0.35) 0%,transparent 70%)",filter:"blur(10px)"}}/>
              <img src={AIEON_LOGO_B64} alt="AieonLabs" style={{width:64,height:64,objectFit:"contain",position:"relative",zIndex:1,filter:"drop-shadow(0 0 10px rgba(59,110,248,0.9)) drop-shadow(0 0 20px rgba(0,212,200,0.6))"}}/>
            </div>
          </div>
          <div style={{fontSize:10,color:"#3b6ef8",letterSpacing:4,textTransform:"uppercase",fontFamily:"monospace",marginBottom:10}}>AieonFounder Demo</div>
          <div style={{fontSize:20,fontWeight:900,color:"#fff",marginBottom:10,lineHeight:1.2}}>See what AieonFounder does -- for someone else.</div>
          <div style={{fontSize:13,color:"rgba(255,255,255,0.55)",lineHeight:1.75,marginBottom:20}}>
            We'll randomly generate a complete founder profile -- different location, capital runway, background, and personality type every time. You'll see exactly what a real session looks like for a real founder.
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:0}}>
            {[
              {icon:"[dna]",text:"Random location, capital, and background"},
              {icon:"[brain]",text:"MBTI type calibrated to the profile"},
              {icon:"[fire]",text:"5 ideas specific to who they are"},
              {icon:"[suit]",text:"Full board session with real assessments"},
            ].map(function(item,i){ return(
              <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 12px",background:"rgba(255,255,255,0.04)",borderRadius:10,border:"1px solid rgba(255,255,255,0.06)",textAlign:"left"}}>
                <span style={{fontSize:15,flexShrink:0}}>{item.icon}</span>
                <span style={{fontSize:12,color:"rgba(255,255,255,0.6)"}}>{item.text}</span>
              </div>
            ); })}
          </div>
        </div>
        <div style={{padding:"0 28px 28px",display:"flex",flexDirection:"column",gap:8,position:"relative",zIndex:1}}>
          <button onClick={onJumpToIdeas} style={{width:"100%",padding:"13px",borderRadius:12,background:"linear-gradient(135deg,#1a56db,#00d4c8)",color:"#fff",border:"none",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"inherit",boxShadow:"0 6px 24px rgba(26,86,219,0.4)"}}>
            [fire] Generate Ideas Instantly
          </button>
          <button onClick={onSkipQuiz} style={{width:"100%",padding:"13px",borderRadius:12,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.7)",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>
            Z Start from MBTI
          </button>
          <button onClick={onCancel} style={{width:"100%",padding:"10px",borderRadius:12,background:"none",border:"none",color:"rgba(255,255,255,0.4)",fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>
            Take the real quiz instead
          </button>
        </div>
      </div>
    </div>
  );
}


function ResetConfirmModal({onConfirm,onCancel,hasProgress}){
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(8,15,43,0.88)",zIndex:2000,display:"flex",alignItems:"center",justifyContent:"center",padding:20,fontFamily:"system-ui,sans-serif"}}>
      <div style={{background:"#fff",borderRadius:20,maxWidth:400,width:"100%",overflow:"hidden",boxShadow:"0 24px 80px rgba(0,0,0,0.4)"}}>
        <div style={{background:"linear-gradient(135deg,#060d1f,#0d1f4e)",padding:"24px 28px",textAlign:"center"}}>
          <div style={{animation:"arcFloat 4.5s ease-in-out infinite",marginBottom:12,display:"inline-block"}}>
            <img src={AIEON_LOGO_B64} alt="AieonLabs" style={{width:56,height:56,objectFit:"contain",filter:"drop-shadow(0 0 10px rgba(59,110,248,0.9)) drop-shadow(0 0 20px rgba(0,212,200,0.6))"}}/>
          </div>
          <div style={{fontSize:18,fontWeight:800,color:"#fff",marginBottom:4}}>Start a new session?</div>
          <div style={{fontSize:13,color:"rgba(255,255,255,0.5)",lineHeight:1.6}}>{hasProgress?"Your current answers, ideas, and board session will be cleared.":"Your current progress will be cleared."}</div>
        </div>
        <div style={{padding:"20px 24px",display:"flex",flexDirection:"column",gap:10}}>
          <button onClick={onConfirm} style={{width:"100%",padding:"13px",borderRadius:12,background:"linear-gradient(135deg,#1a56db,#3b82f6)",color:"#fff",border:"none",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>
            Yes, start fresh ->
          </button>
          <button onClick={onCancel} style={{width:"100%",padding:"13px",borderRadius:12,background:"none",border:"1.5px solid #e2e8f0",color:"#64748b",fontSize:14,cursor:"pointer",fontFamily:"inherit"}}>
            Keep my session
          </button>
        </div>
      </div>
    </div>
  );
}


function MainApp(){
  const[phase,setPhase]=useState("landing");
  const[accepted,setAccepted]=useState(false);
  const[questions]=useState(()=>buildSession());
  const[step,setStep]=useState(0);
  const[answers,setAnswers]=useState({});
  const[val,setVal]=useState("");
  const[mbtiQs]=useState(()=>drawMBTI());
  const[mbtiStep,setMbtiStep]=useState(0);
  const[mbtiAns,setMbtiAns]=useState({});
  const[mbtiType,setMbtiType]=useState(null);
  const[ideas,setIdeas]=useState([]);
  const[ownIdeas,setOwnIdeas]=useState([]);
  const[reactions,setReactions]=useState({});
  const[generateCount,setGenerateCount]=useState(0);
  const[genDebug,setGenDebug]=useState(null);
  const[roadmap,setRoadmap]=useState(null);
  const[roadmapLoading,setRoadmapLoading]=useState(false);
  const[blindspots,setBlindspots]=useState(null);
  const[blindspotsLoading,setBlindspotsLoading]=useState(false);
  const[showHeatmap,setShowHeatmap]=useState(false);
  const[tempCapital,setTempCapital]=useState("");
  const[loadingSimilar,setLoadingSimilar]=useState(null);
  const[exploring,setExploring]=useState(null);
  const[exploreChat,setExploreChat]=useState([]);
  const[exploreInput,setExploreInput]=useState("");
  const[exploreLoading,setExploreLoading]=useState(false);
  const[evolvedIdea,setEvolvedIdea]=useState(null);
  const[evolveLoading,setEvolveLoading]=useState(false);
  const[craftChat,setCraftChat]=useState([]);
  const[craftInput,setCraftInput]=useState("");
  const[craftLoading,setCraftLoading]=useState(false);
  const[pendingCraftIdea,setPendingCraftIdea]=useState(null);
  const[lockedIdea,setLockedIdea]=useState(null);
  const[tier,setTier]=useState("free");
  const[founderEmail,setFounderEmail]=useState("");
  const[demoLabel,setDemoLabel]=useState("");
  const[showDemoModal,setShowDemoModal]=useState(false);
  const[isDemoSession,setIsDemoSession]=useState(false);
  const[showResetConfirm,setShowResetConfirm]=useState(false);
  const[emailCaptured,setEmailCaptured]=useState(false);
  const[emailInput,setEmailInput]=useState("");
  const[emailError,setEmailError]=useState("");
  const[emailSubmitting,setEmailSubmitting]=useState(false);
  const[showUpgrade,setShowUpgrade]=useState(false);
  const[showIgnite,setShowIgnite]=useState(false);
  const[showArc,setShowArc]=useState(false);
  const[advisorTexts,setAdvisorTexts]=useState({});
  const[loadingMap,setLoadingMap]=useState({});
  const[boardReady,setBoardReady]=useState(false);
  const[synthesis,setSynthesis]=useState(null);
  const[animKey,setAnimKey]=useState(0);
  const chatBottom=useRef(null);
  const craftBottom=useRef(null);
  const crucibleTop=useRef(null);
  const q=questions[step];

  useEffect(()=>{setAnimKey(k=>k+1);const s=answers[q?.id];setVal(s||"");},[step]);
  useEffect(()=>{chatBottom.current?.scrollIntoView({behavior:"smooth"});},[exploreChat]);
  useEffect(()=>{craftBottom.current?.scrollIntoView({behavior:"smooth"});},[craftChat]);

  const isValid=()=>{
    if(!q)return false;
    if(q.type==="location")return !!(val?.text?.trim());
    if(q.type==="open")return typeof val==="string"&&val.trim().length>0;
    return !!val;
  };

  function nextStep(){
    if(!isValid())return;
    let v=val;
    if(typeof v==="string"&&v.startsWith("__other__:"))v=v.slice(10).trim()||"(custom)";
    setAnswers(a=>({...a,[q.id]:v}));
    if(step<questions.length-1)setStep(s=>s+1);
    else setPhase("mbti_prompt");
  }

  function buildBrief(){
    const parts=Object.entries(answers).map(([k,v])=>k+": "+(typeof v==="object"?v.text+" (market: "+v.scope+")":String(v)));
    return "FOUNDER PROFILE:\nMBTI: "+(mbtiType?mbtiType+" -- "+(MBTI_TYPES[mbtiType]?.name||""):"Not assessed")+"\n"+parts.join("\n");
  }

  const allIdeas=[...ideas,...ownIdeas];
  const excitedIdeas=allIdeas.filter(idea=>reactions[idea.id]==="excited");

  // -- IDEA GENERATION -- Three Gemini-engineered prompts ------------
  async function generateIdeas(capitalOverride, answersOverride){
    const activeAnswers = answersOverride || answers;
    setPhase("loading");

    const loc=activeAnswers.location;
    const locStr=loc?loc.text+" (market: "+loc.scope+")":"location not specified";
    const capital=capitalOverride||activeAnswers.capital||"unknown capital";
    const aspirational=!!(capitalOverride&&capitalOverride!==activeAnswers.capital);
    const mbtiT=mbtiType?MBTI_TYPES[mbtiType]:null;
    const aspirationalNote=aspirational?"\nIMPORTANT -- ASPIRATIONAL MODE ACTIVE: This founder's actual capital is "+activeAnswers.capital+". They are exploring what businesses become possible at "+capital+". You MUST identify opportunities that require "+capital+" and are genuinely impossible at "+activeAnswers.capital+".":"";
    const capitalTierNote=aspirational?(capitalOverride==="$25,000-$100,000"?"CAPITAL TIER "+capital+": Infrastructure Plays ONLY -- software products needing dev budget, premium physical locations with equipment, licensed professional practices, small import/export with real inventory. These cannot start at "+activeAnswers.capital+".":"CAPITAL TIER "+capital+": Institutional Plays ONLY -- name specific real franchise brands with entry costs (e.g. Kumon $70K-$150K, Anytime Fitness $100K-$500K, Jan-Pro Cleaning $5K-$50K, The UPS Store $150K-$470K), brick-and-mortar retail with real lease/buildout costs, licensed medical or dental practice acquisition, commercial real estate ventures. These are businesses that employ people and have real overhead from day one."):""

    // Build brief from activeAnswers
    const parts=Object.entries(activeAnswers).map(([k,v])=>k+": "+(typeof v==="object"?v.text+" (market: "+v.scope+")":String(v)));
    const activeBrief="FOUNDER PROFILE:\nMBTI: "+(mbtiType?mbtiType+" -- "+(MBTI_TYPES[mbtiType]?.name||""):"Not assessed")+"\n"+parts.join("\n");

    // PROMPT 1 -- Forensic Asset Map via structured output (parse failure impossible)
    const p1schema={
      type:"object",
      properties:{
        languages:{type:"array",items:{type:"string"}},
        cultures:{type:"array",items:{type:"string"}},
        industries:{type:"array",items:{type:"string"}},
        skills:{type:"array",items:{type:"string"}},
        communities:{type:"array",items:{type:"string"}},
        uniqueAccess:{type:"array",items:{type:"string"}},
        professionalReputation:{type:"string"},
        locationDetail:{type:"string"},
        weeklyHours:{type:"string"},
        capitalAmount:{type:"string"},
        riskProfile:{type:"string"},
        workStyle:{type:"string"},
        motivationCore:{type:"string"},
      },
      required:["languages","cultures","industries","skills","communities","uniqueAccess","professionalReputation","locationDetail","capitalAmount","riskProfile","motivationCore"],
    };
    const p1sys="You are a High-Fidelity Signal Analyst. Deconstruct this founder profile into a Forensic Asset Map. Look beyond the text -- identify linguistic moats, cultural insider status, and non-obvious network access. For languages and cultures, assume that years lived or worked in a region means high-trust nuances of that region. For Unique Access, identify specific institutions, high-net-worth enclaves, or professional circles they can enter where a generic outsider would be barred.";
    // P1 -- plain JSON (more reliable in artifact sandbox than tool_use)
    const p1raw = await callClaude(p1sys,"Extract forensic signals as JSON only (no markdown, no text, just the JSON object):\n"+activeBrief+aspirationalNote,2,1500);
    let signals={languages:[],cultures:[],industries:[],skills:[],communities:[],uniqueAccess:[],professionalReputation:"",locationDetail:locStr,weeklyHours:"",capitalAmount:capital,riskProfile:"Calculated",workStyle:"Solo",motivationCore:""};
    try{
      let raw=p1raw.trim().split("```json").join("").split("```").join("").replace(/^json/i,"").trim();
      const s=raw.indexOf("{"),e=raw.lastIndexOf("}");
      if(s!==-1&&e!==-1)raw=raw.slice(s,e+1);
      Object.assign(signals,JSON.parse(raw));
    }catch(err){console.warn("P1 parse failed, using defaults",err);}
    const signalsStr=JSON.stringify(signals,null,2);

    // PROMPT 2 -- Wealth and Trust Topography (text is fine here -- it's used as context not parsed)
    const p2sys="You are a Hyper-Local Intelligence Officer. Map the Wealth and Trust Topography of this founder's location.\n\nFOUNDER SIGNALS:\n"+signalsStr+"\n\nCAPITAL: "+capital+"\nLOCATION: "+locStr+"\n"+aspirationalNote+"\n\nExecute these four analysis steps:\n\n1. WEALTH MAP: Name specific luxury residential clusters, high-growth ethnic business districts, professional hubs. Use real neighborhood names.\n\n2. TRUST GAPS: Name 3 communities in "+locStr+" that are closed to outsiders. State which ones this founder can enter as an insider and exactly why.\n\n3. CAPITAL PLAYS: Focus on opportunities matching "+capital+" capital level.\n\n4. HIGH-STAKES NICHES: Identify niches where a mistake is expensive (Medical, Legal, Crypto-Security, Immigration, Wealth Management) and where this founder's profile creates a forensic edge.\n\nReturn 8-10 specific bullet points per section. Use real names throughout.";
    const p2raw=await callClaude(p2sys,"Analyze market opportunities in "+locStr+".", 2, 2000);

    // PROMPT 3 -- Venture Architecture via structured output (guaranteed valid JSON)
    const ideaSchema={
      type:"object",
      properties:{
        ideas:{
          type:"array",
          minItems:5,
          maxItems:5,
          items:{
            type:"object",
            properties:{
              id:{type:"string"},
              title:{type:"string"},
              concept:{type:"string"},
              story:{type:"string"},
              spendPlan:{type:"string"},
              moat:{type:"string"},
              reason:{type:"string"},
              insiderPitch:{type:"string"},
            },
            required:["id","title","concept","story","spendPlan","moat","reason","insiderPitch"],
          },
        },
      },
      required:["ideas"],
    };

    const aspirationalCategoryNote=aspirational?(
      capital==="$25,000-$100,000"?
      "ASPIRATIONAL ($25k-$100k): Suggest infrastructure plays -- a real app or SaaS product with named comparable, premium brick-and-mortar concept with real lease costs, licensed professional practice startup. Categorically different from low-capital consulting ideas.":
      "ASPIRATIONAL ($100k+): Suggest specific named franchises with real entry investment ranges (e.g., Kumon, UPS Store, 7-Eleven), brick-and-mortar retail or hospitality with real estate costs, investment-oriented businesses, licensed practice acquisition. Businesses that employ people and have real overhead."
    ):"";

    const p3sys=(capitalTierNote?"MANDATORY OVERRIDE -- READ THIS FIRST:\n"+capitalTierNote+"\nEvery single one of the 5 ideas MUST belong to this category.\n---\n\n":"")+"You are an Elite Venture Architect. Each idea must be so specific the founder can visualize their first client interaction.\n\nCAPITAL AVAILABLE: "+capital+"\nMBTI: "+(mbtiType?mbtiType+" -- "+(mbtiT?.name||""):"Not assessed")+"\n\nMARKET INTELLIGENCE:\n"+p2raw+"\n\nFOUNDER SIGNALS:\n"+signalsStr+"\n\nFULL PROFILE:\n"+activeBrief+"\n\nFor each of the 5 ideas provide:\n- title, concept, story, spendPlan, moat, reason, insiderPitch\n\nGenerate exactly 5 ideas.";

    // P3 -- plain JSON (same approach that works reliably in Feature 3)
    const p3raw = await callClaude(
      p3sys + "\n\nReturn ONLY a valid JSON object with this structure -- no markdown, no explanation, start with { and end with }:\n{\"ideas\":[{\"id\":\"a1\",\"title\":\"string\",\"concept\":\"string\",\"story\":\"string\",\"spendPlan\":\"string\",\"moat\":\"string\",\"reason\":\"string\",\"insiderPitch\":\"string\"}]}\nGenerate exactly 5 idea objects. No apostrophes in contractions.",
      "Generate 5 hyper-specific venture concepts for this founder. JSON only.",
      2, 4000
    );

    let parsedIdeas = null;
    try {
      let raw = p3raw.trim().split("```json").join("").split("```").join("").replace(/^json/i,"").trim();
      const s = raw.indexOf("{"), e = raw.lastIndexOf("}");
      if (s !== -1 && e !== -1) raw = raw.slice(s, e+1);
      const parsed = JSON.parse(raw);
      if (parsed?.ideas?.length > 0) parsedIdeas = parsed.ideas;
    } catch(err) {
      // Try extracting array directly
      try {
        const arrStart = p3raw.indexOf("["), arrEnd = p3raw.lastIndexOf("]");
        if (arrStart !== -1 && arrEnd !== -1) {
          const arr = JSON.parse(p3raw.slice(arrStart, arrEnd+1));
          if (Array.isArray(arr) && arr.length > 0) parsedIdeas = arr;
        }
      } catch {}
    }

    if(parsedIdeas?.length > 0){
      setIdeas(parsedIdeas.map(i=>({...i,isAI:true})));
      setGenerateCount(c=>c+1);setReactions({});
    } else {
      // Fallback ideas -- shown when parse fails
      const l=loc?.text||"your area";
      const cap=capital||"your budget";
      setIdeas([
        {id:"f1",isAI:true,title:"Hyper-Local Service Business",concept:"The most overlooked opportunity in "+l+" is a service business that solves a specific, recurring pain point for a defined customer segment. Service businesses require almost no startup capital and can generate revenue within weeks.",story:"You are at a local business networking event. A property manager says they can never find reliable vendors. You say: \"I specialize in exactly this. Let me send you a proposal this week.\"",spendPlan:"Business registration $200, basic website $300, business cards $50, outreach tools $200. Total: ~$750",moat:"You are local, reachable, and accountable -- the three things most online services cannot offer.",reason:"Directly leverages your background and community access in "+l,insiderPitch:"I know this market because I live here and I know what's missing."},
        {id:"f2",isAI:true,title:"Consulting in Your Domain of Expertise",concept:"Your professional background contains skills that other businesses will pay for on a project basis. Consulting requires zero capital, leverages what you already know, and can start generating revenue with a single conversation.",story:"A former colleague messages you asking if you do freelance work. You say: \"I just started. Tell me what you need and I'll tell you if I can help.\"",spendPlan:"LLC formation $200, simple contract template $0, invoicing software free tier $0, outreach $0. Revenue before expenses.",moat:"You already have the credibility. You just need to package it.",reason:"Your specific background creates immediate trust in conversations others can't have",insiderPitch:"I've done this from the inside. I know what actually goes wrong."},
        {id:"f3",isAI:true,title:"Community-Based Business",concept:"Every community has gatekeepers, trusted figures, and unmet needs. Your access to specific communities in "+l+" is a business asset most founders overlook. Trust is the moat.",story:"Someone in your community asks you for help with something they can't find anywhere else. You realize twenty people need the same thing. You say: \"I'm building something for exactly this.\"",spendPlan:"Minimal overhead -- start with "+cap+". First revenue funds next step.",moat:"Community trust cannot be bought or replicated by outsiders.",reason:"Your network and cultural access are the business -- no one else has your seat at this table",insiderPitch:"I'm one of you. I built this for us."},
        {id:"f4",isAI:true,title:"Digital Product or Content Business",concept:"Your knowledge and experience can be packaged into digital products -- guides, templates, courses, or content -- that generate revenue without requiring your time for every sale.",story:"Someone asks you the same question for the fifth time this month. You realize you could turn your answer into something people would pay for.",spendPlan:"Content creation tools $0-$100, simple landing page $0, payment processing free tier. Near-zero startup cost.",moat:"Authenticity and specificity. Generic content is everywhere. Your specific POV is not.",reason:"You have hard-won knowledge in your domain that others are actively searching for",insiderPitch:"I spent years learning this so you don't have to."},
        {id:"f5",isAI:true,title:"B2B Service for an Underserved Niche",concept:"Small businesses in "+l+" are systematically underserved by large agencies and overcharged by generalists. A focused B2B service targeting one specific niche can command premium prices and build loyal clients quickly.",story:"You walk into a local business and immediately see three things they're doing wrong in your area of expertise. You say: \"I specialize in exactly this industry. Most of my clients see results in 60 days.\"",spendPlan:"Professional materials $300, one month of outreach tools $100, travel for meetings $200. First client covers everything.",moat:"Deep niche knowledge and local presence beats any remote competitor on trust.",reason:"Your background gives you instant credibility in conversations others can only fake",insiderPitch:"I've seen this problem from the inside. I know exactly what it costs them."},
      ]);
      setGenerateCount(c=>c+1);
    }
    setPhase("crucible");
    setTimeout(()=>crucibleTop.current?.scrollIntoView({behavior:"smooth"}),100);
  }
  async function generateSimilarIdeas(concept,ideaId){
    setLoadingSimilar(ideaId);
    const brief=buildBrief();
    const capital=answers.capital||"unknown capital";
    const sys="Generate exactly 3 specific business ideas that are intelligent variations or adjacent opportunities to this concept. Same rules: no generic categories, real business names in \"double quotes,\" specific capital breakdown against "+capital+". Return ONLY valid JSON: [{\"id\":\"s1\",\"title\":\"...\",\"description\":\"3 sentences with real business name in quotes and capital breakdown. End: ! AI-generated.\",\"reason\":\"Similar to your concept because...\"}]";
    const raw=await callClaude(sys,"Concept: "+concept+"\n\nFounder:\n"+brief+"\n\nGenerate 3 intelligent variations.");
    try{
      const parsed=JSON.parse(raw.split("\x60\x60\x60json").join("").split("\x60\x60\x60").join("").trim());
      if(Array.isArray(parsed)&&parsed.length>0){
        setIdeas(prev=>[...prev,...parsed.map((item,idx)=>({...item,id:"sim_"+Date.now()+"_"+idx,isSimilar:true}))]);
      } else throw new Error("empty");
    }catch{
      // Always show something
      setIdeas(prev=>[...prev,
        {id:"sim_"+Date.now()+"_0",title:concept.slice(0,50)+" -- Premium Positioning",description:"A white-glove, premium-priced version of your concept targeting clients who pay for trust and discretion over price. Similar to how \"Four Seasons\" operates in hospitality -- same product category, completely different price tier. With "+capital+": invest in brand identity and one anchor client case study. ! AI-generated.",reason:"Premium version of your concept",isSimilar:true},
        {id:"sim_"+Date.now()+"_1",title:concept.slice(0,50)+" -- B2B Version",description:"The same core service restructured for business clients rather than individuals. B2B typically means longer contracts, higher invoices, and more predictable revenue. Similar to how \"Bench Accounting\" serves SMBs vs consumers. With "+capital+": one targeted industry vertical, LinkedIn outreach campaign. ! AI-generated.",reason:"B2B pivot of your concept",isSimilar:true},
        {id:"sim_"+Date.now()+"_2",title:concept.slice(0,50)+" -- Recurring Subscription",description:"Reframe your concept as a monthly retainer rather than one-time service. Predictable revenue, stronger lifetime value, easier to plan around. Similar to how \"Design Pickle\" built a subscription creative service. With "+capital+": define your monthly deliverable clearly, launch to 5 beta clients first. ! AI-generated.",reason:"Recurring revenue version of your concept",isSimilar:true},
      ]);
    }
    setLoadingSimilar(null);
  }

  // -- SEQUENTIAL BOARD + AUTO-PLAY VOICE ---------------------------
  async function runBoard(idea){
    const ideaTitle=idea?.title||idea;
    const ideaDesc=idea?.description||ideaTitle;
    let ideaSummary=ideaDesc;

    if(idea?.craftedFromChat&&craftChat.length>0){
      ideaSummary=await callClaude("Summarize the business idea from this conversation in 2-3 specific, concrete sentences.",craftChat.map(m=>m.role+": "+m.content).join("\n"));
    }
    if(evolvedIdea?.originalId===idea?.id){
      ideaSummary=evolvedIdea.description;
    }

    setLockedIdea({...idea,resolvedDescription:ideaSummary});
    setPhase("board");
    const brief=buildBrief();
    const capital=answers.capital||"unspecified capital";
    const location=answers.location?.text||"their location";
    const hours=answers.hours||"unspecified availability";

    const PERSONAS={
      cfo:"CFO advisor. Capital: "+capital+". Hours: "+hours+".\nRespond with:\nHEADLINE: One sentence on the key financial insight for this founder.\nASSESSMENT: 4-5 sentences on financial strengths, the main risk, and a concrete this-week action. End: Informational only, verify with a CPA.",
      cmo:"CMO advisor. Location: "+location+". Capital: "+capital+".\nRespond with:\nHEADLINE: One sentence on how to land the first paying customer.\nASSESSMENT: 4-5 sentences naming the specific first customer, where to find them, what to say, and a first-week action. End: Informational only, not marketing advice.",
      legal:"Legal advisor. Location: "+location+".\nRespond with:\nHEADLINE: One sentence on the most important legal step before first client.\nASSESSMENT: 4-5 sentences on the right legal structure, one real risk and how to mitigate it simply. Be practical not alarmist. End: NOT legal advice, consult a licensed attorney.",
      vc:"VC advisor. Capital: "+capital+".\nRespond with:\nHEADLINE: One sentence on what this founder needs to prove to reach scale or investment.\nASSESSMENT: 4-5 sentences on the genuine market opportunity, this founder's position, the gap to fundability, and one concrete milestone. End: Informational only, not investment advice.",
      devil:"Devil's Advocate. Be brutally specific. No encouragement. Capital: "+capital+". Location: "+location+".\nRespond with:\nHEADLINE: One sentence -- the single most specific reason this idea fails for this founder.\nASSESSMENT: 4-5 sentences making the case against. Name real competitors. Name the wrong assumption. Be uncomfortable. End: Informational only, validate with real research.",
    };

    const boardMsg="Evaluate for the founder:\n\nIdea: "+ideaTitle+"\nFull description: "+ideaSummary+"\n\nFounder profile:\n"+brief;

    // Sequential -- each advisor awaits the previous. Zero rate limiting.

    for(const adv of ADVISORS){
      setLoadingMap(m=>({...m,[adv.id]:true}));
      const text=await callClaude(PERSONAS[adv.id],boardMsg);
      setAdvisorTexts(d=>({...d,[adv.id]:text}));
      setLoadingMap(m=>({...m,[adv.id]:false}));
      await new Promise(r=>setTimeout(r,2500));
    }

    setBoardReady(true);

    const synSys="Return ONLY valid JSON, no markdown: {\"score\":72,\"action\":\"Specific critical action for next 30 days\",\"strength\":\"Specific hidden advantage this founder has\",\"archetype\":\"e.g. The Strategic Builder\",\"pivot\":\"If this doesn't gain traction in 90 days, the most logical specific pivot for this founder is: [one concrete sentence]\"}";
    try{
      const raw=await callClaude(synSys,"Idea: "+ideaTitle+"\nDescription: "+ideaSummary+"\nFounder:\n"+brief+"\n\nSynthesize.");
      setSynthesis(JSON.parse(raw.split("\x60\x60\x60json").join("").split("\x60\x60\x60").join("").trim()));
    }catch{
      setSynthesis({score:70,action:"Talk to 10 real potential customers before spending anything.",strength:"Your lived experience gives you insight others simply don't have.",archetype:"The Strategic Builder",pivot:"Consider narrowing to a single hyper-specific customer segment and validating with 3 paid pilots before expanding."});
    }

    // F3 -- Auto-generate 30-day roadmap in background after board completes
    setRoadmapLoading(true);
    generateRoadmap(
      {title:ideaTitle,concept:ideaSummary},
      {location:answers.location?.text,capital:answers.capital,background:answers.work_hist}
    ).then(r=>{ if(r?.weeks?.length)setRoadmap(r); }).catch(e=>console.warn('Roadmap error:',e)).finally(()=>setRoadmapLoading(false));
  }

  function reset(){
    setPhase("landing");setStep(0);setAnswers({});setVal("");setMbtiStep(0);setMbtiAns({});setMbtiType(null);
    setIdeas([]);setOwnIdeas([]);setReactions({});setGenerateCount(0);setTempCapital("");setLoadingSimilar(null);
    setExploring(null);setExploreChat([]);setEvolvedIdea(null);setCraftChat([]);setPendingCraftIdea(null);
    setLockedIdea(null);setAdvisorTexts({});setLoadingMap({});setBoardReady(false);setSynthesis(null);setGenDebug(null);setEmailInput("");setEmailError("");setEmailCaptured(false);setEmailSubmitting(false);setShowResetConfirm(false);setIsDemoSession(false);setShowDemoModal(false);setRoadmap(null);setBlindspots(null);setRoadmapLoading(false);setBlindspotsLoading(false);setShowHeatmap(false);
  }

  const ps=(dark=false)=>({minHeight:"100vh",background:dark?"linear-gradient(155deg,"+CL.navyDark+","+CL.navy+")":CL.offWhite,fontFamily:"system-ui,-apple-system,sans-serif"});
  const cs={display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh",padding:"24px 16px"};

  useEffect(()=>{
    const el=document.createElement('style');
    el.textContent="@keyframes orbit1{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@keyframes orbit2{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}@keyframes pulseCore{0%,100%{box-shadow:0 0 20px #1a56db66}50%{box-shadow:0 0 40px #3b82f688}}@keyframes stepIn{from{opacity:0;transform:translateX(8px)}to{opacity:1;transform:translateX(0)}}@keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}@keyframes cardIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}@keyframes travel{0%{stroke-dashoffset:200}100%{stroke-dashoffset:0}}@keyframes pulse2{0%,100%{opacity:0.6;transform:scale(1)}50%{opacity:1;transform:scale(1.08)}}@keyframes spin{to{transform:rotate(360deg)}}@keyframes arcFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}@keyframes arcSpark{0%{opacity:0;transform:translate(0,0) scale(1)}12%{opacity:1}65%{opacity:0.8}100%{opacity:0;transform:translate(20px,-40px) scale(0.08)}}@keyframes arcRing{0%,100%{transform:scale(1);opacity:0.2}50%{transform:scale(1.04);opacity:0.8}}@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}@keyframes slideIn{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}";
    document.head.appendChild(el);
    return ()=>document.head.removeChild(el);
  },[]);

  return(
    <div>
      
      {(!accepted&&phase!=="landing")&&<DisclaimerModal onAccept={()=>setAccepted(true)} onDecline={()=>{setPhase("landing");setAccepted(false);}}/>}
      {showDemoModal&&<DemoIntroModal
        onJumpToIdeas={()=>{
          const p=pickDemoProfile();setDemoLabel(p._label);
          setAnswers(p);setMbtiType(p.mbtiType||"ESTP");
          setIsDemoSession(true);setShowDemoModal(false);
          generateIdeas(undefined,p);
        }}
        onSkipQuiz={()=>{
          const p=pickDemoProfile();setDemoLabel(p._label);
          setAnswers(p);setMbtiType(p.mbtiType||"ESTP");
          setIsDemoSession(true);setShowDemoModal(false);
          setPhase("scorecard");
        }}
        onCancel={()=>setShowDemoModal(false)}
      />}
      {showResetConfirm&&<ResetConfirmModal
        hasProgress={phase!=="landing"}
        onConfirm={()=>{setShowResetConfirm(false);reset();}}
        onCancel={()=>setShowResetConfirm(false)}
      />}
      {showUpgrade&&<UpgradeModal onClose={()=>setShowUpgrade(false)} onUpgrade={()=>{setTier("ignite");setShowUpgrade(false);}}/> }
      {showIgnite&&<IgniteModal onClose={function(){setShowIgnite(false);}}/>}
      {showArc&&(
        <div style={{position:"fixed",inset:0,background:"#060d1f",zIndex:900,overflowY:"auto"}}>
          <div style={{position:"sticky",top:0,zIndex:10,background:"rgba(6,13,31,0.95)",padding:"12px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
            <div style={{fontSize:13,fontWeight:700,color:"rgba(255,255,255,0.6)"}}>AieonFounder</div>
            <button onClick={()=>setShowArc(false)} style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.12)",color:"rgba(255,255,255,0.6)",borderRadius:8,padding:"10px 16px",fontSize:13,cursor:"pointer",fontFamily:"inherit"}}><- Back to Board</button>
          </div>
          <FounderArc tier={tier} onUpgradeClick={()=>{setShowArc(false);setShowUpgrade(true);}} lockedIdea={lockedIdea} answers={answers}/>
        </div>
      )}

      {/* LANDING */}
      {phase==="landing"&&(
        <div style={ps(true)}>
          <div style={{...cs,textAlign:"center"}}>
            <div style={{animation:"fadeUp 0.8s ease",maxWidth:660,width:"100%"}}>
              <div style={{marginBottom:36,position:"relative",display:"flex",flexDirection:"column",alignItems:"center"}}>
                {/* Landing logo sparks - B+C constellation + embers */}
                <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",overflow:"visible"}} xmlns="http://www.w3.org/2000/svg">
                  <line x1="10%" y1="10%" x2="30%" y2="40%" stroke="#3b6ef8" strokeWidth="0.5" opacity="0.22"/>
                  <line x1="30%" y1="40%" x2="50%" y2="25%" stroke="#00d4c8" strokeWidth="0.5" opacity="0.2"/>
                  <line x1="50%" y1="25%" x2="75%" y2="35%" stroke="#5588ff" strokeWidth="0.4" opacity="0.18"/>
                  <line x1="75%" y1="35%" x2="85%" y2="20%" stroke="#3b6ef8" strokeWidth="0.4" opacity="0.16"/>
                  <line x1="30%" y1="40%" x2="20%" y2="75%" stroke="#00f0e0" strokeWidth="0.4" opacity="0.16"/>
                  <line x1="50%" y1="25%" x2="60%" y2="65%" stroke="#3b6ef8" strokeWidth="0.4" opacity="0.15"/>
                  <line x1="60%" y1="65%" x2="75%" y2="70%" stroke="#00d4c8" strokeWidth="0.3" opacity="0.14"/>
                  <line x1="40%" y1="90%" x2="60%" y2="65%" stroke="#5588ff" strokeWidth="0.3" opacity="0.13"/>
                </svg>
                {[
                  {l:"10%",t:"10%",s:2,  bg:"#3b6ef8",dur:"1.8s",del:"0.0s",rot:-25},
                  {l:"85%",t:"20%",s:2,  bg:"#00d4c8",dur:"1.7s",del:"0.4s",rot:20},
                  {l:"20%",t:"75%",s:2,  bg:"#5588ff",dur:"2.0s",del:"0.7s",rot:35},
                  {l:"75%",t:"70%",s:2,  bg:"#00f0e0",dur:"1.9s",del:"1.0s",rot:-30},
                  {l:"50%",t:"5%", s:2,  bg:"#3b6ef8",dur:"1.7s",del:"1.1s",rot:-10},
                  {l:"5%", t:"50%",s:2,  bg:"#00d4c8",dur:"2.0s",del:"0.2s",rot:40},
                  {l:"92%",t:"50%",s:2,  bg:"#5588ff",dur:"1.8s",del:"0.9s",rot:-20},
                  {l:"40%",t:"90%",s:2,  bg:"#00f0e0",dur:"2.1s",del:"0.5s",rot:30},
                  {l:"60%",t:"30%",s:2,  bg:"#3b6ef8",dur:"1.6s",del:"1.3s",rot:15},
                  {l:"30%",t:"40%",s:3,  bg:"#00d4c8",dur:"1.7s",del:"0.3s",rot:-35},
                  {l:"75%",t:"35%",s:3,  bg:"#5588ff",dur:"1.9s",del:"0.8s",rot:25},
                  {l:"60%",t:"65%",s:3,  bg:"#3b6ef8",dur:"1.8s",del:"1.2s",rot:-15},
                  {l:"3%", t:"25%",s:2,  bg:"#00f0e0",dur:"2.0s",del:"1.5s",rot:20},
                  {l:"95%",t:"75%",s:2,  bg:"#3b6ef8",dur:"1.7s",del:"0.6s",rot:-25},
                  {l:"50%",t:"25%",s:4.5,bg:"#3b6ef8",dur:"1.5s",del:"0.5s",rot:-10,anchor:true},
                  {l:"70%",t:"55%",s:4.5,bg:"#00d4c8",dur:"1.6s",del:"0.9s",rot:20, anchor:true},
                ].map(function(sp,i){
                  return(
                    <div key={i} style={{position:"absolute",left:sp.l,top:sp.t,pointerEvents:"none",animation:"arcSpark "+sp.dur+" linear "+sp.del+" infinite",opacity:0}}>
                      <div style={{position:"absolute",width:sp.s*3.5,height:sp.s*0.6,background:sp.bg,borderRadius:"50%",opacity:0.75,top:"50%",left:"50%",transform:"translate(-50%,-50%) rotate("+sp.rot+"deg)"}}/>
                      <div style={{position:"absolute",width:sp.s,height:sp.s,background:sp.anchor?"#ffffff":sp.bg,borderRadius:"50%",opacity:sp.anchor?0.95:0.88,top:"50%",left:"50%",transform:"translate(-50%,-50%)",boxShadow:sp.anchor?"0 0 "+(sp.s*2)+"px "+sp.bg:"0 0 "+(sp.s*1.5)+"px "+sp.bg}}/>
                    </div>
                  );
                })}
                <div style={{animation:"arcFloat 4.5s ease-in-out infinite",position:"relative",zIndex:2}}>
                  <div style={{position:"relative",display:"inline-block"}}>
                    <div style={{position:"absolute",inset:-24,borderRadius:"50%",background:"radial-gradient(circle,rgba(59,110,248,0.35) 0%,rgba(0,212,200,0.15) 45%,transparent 70%)",filter:"blur(14px)"}}/>
                    <img src={AIEON_LOGO_B64} alt="AieonLabs" style={{width:110,height:110,objectFit:"contain",position:"relative",zIndex:1,filter:"drop-shadow(0 0 12px rgba(59,110,248,0.95)) drop-shadow(0 0 28px rgba(0,212,200,0.65)) drop-shadow(0 0 48px rgba(59,110,248,0.4))"}}/>
                  </div>
                </div>
                <div style={{marginTop:16,fontSize:11,color:"rgba(255,255,255,0.5)",letterSpacing:3,textTransform:"uppercase",fontFamily:"monospace"}}>AieonFounder * by AieonLabs</div>
              </div>
              <h1 style={{fontSize:"clamp(32px,5.5vw,58px)",fontWeight:900,color:CL.white,margin:"0 0 14px",lineHeight:1.1,letterSpacing:"-0.5px"}}>The business you were built for.</h1>
              <p style={{fontSize:16,color:"rgba(255,255,255,0.6)",lineHeight:1.8,margin:"0 0 32px"}}>Take a personalized quiz. Discover your MBTI founder type. Lock in your idea through the Crucible. Get stress-tested by five AI advisors. Then follow a guided roadmap from idea to registered business.</p>
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,flexWrap:"wrap",marginBottom:32}}>
                {[{i:"[dna]",l:"DNA Quiz"},{i:"[brain]",l:"MBTI Type"},{i:"[fire]",l:"Idea Crucible"},{i:"[suit]",l:"Board Session"},{i:"[map]",l:"Roadmap"}].map(function(s,idx){ return(
                  <div key={idx} style={{display:"flex",alignItems:"center",gap:6}}>
                    <div style={{textAlign:"center"}}><div style={{fontSize:18,marginBottom:3}}>{s.i}</div><div style={{fontSize:10,color:"rgba(255,255,255,0.4)",fontWeight:600}}>{s.l}</div></div>
                    {idx<4&&<span style={{color:"rgba(255,255,255,0.5)"}}>-></span>}
                  </div>
                ); })}
              </div>
              <button onClick={()=>{reset();setPhase("quiz");}} style={{background:"linear-gradient(135deg,"+CL.blue+","+CL.blueBright+")",color:CL.white,border:"none",borderRadius:14,padding:"16px 48px",fontSize:17,fontWeight:700,cursor:"pointer",boxShadow:"0 8px 32px "+CL.blue+"55",fontFamily:"inherit",transition:"all 0.25s"}} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e=>e.currentTarget.style.transform=""}>Start Free -></button>
              {/* Demo mode -- skip quiz with pre-loaded profile */}
              <div style={{marginTop:12,textAlign:"center"}}>
                <button onClick={()=>setShowDemoModal(true)} style={{background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.55)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:10,padding:"10px 24px",fontSize:13,cursor:"pointer",fontFamily:"inherit",display:"inline-flex",alignItems:"center",gap:8}}>
                  [film] Watch a Demo Session
                </button>
              </div>
              <div style={{marginTop:6,fontSize:11,color:"rgba(255,255,255,0.5)"}}>Under 10 minutes * Free * No account needed</div>
              {demoLabel&&<div style={{marginTop:8,fontSize:11,color:"rgba(59,130,246,0.7)",fontFamily:"monospace",letterSpacing:0.5}}>Demo: {demoLabel}</div>}
              <div style={{marginTop:24,padding:"10px 18px",background:"rgba(255,165,0,0.1)",border:"1px solid rgba(255,165,0,0.2)",borderRadius:10,fontSize:12,color:"rgba(255,255,255,0.45)",lineHeight:1.5}}>{DISCLAIMER_SHORT}</div>
            </div>
          </div>
        </div>
      )}

      {/* QUIZ */}
      {phase==="quiz"&&(
        <div style={ps()}>
          <Banner/>
          <div style={{position:"sticky",top:0,background:"rgba(248,250,255,0.96)",backdropFilter:"blur(12px)",borderBottom:"1px solid "+CL.border,padding:"14px 16px",zIndex:10}}>
            <div style={{maxWidth:600,margin:"0 auto"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontSize:12,color:CL.muted,fontFamily:"monospace"}}>Q{step+1} OF {questions.length}</span><span style={{fontSize:12,color:CL.blue,fontWeight:700}}>{Math.round(((step+1)/questions.length)*100)}%</span></div>
              <div style={{height:4,background:CL.border,borderRadius:2,overflow:"hidden"}}><div style={{height:"100%",width:Math.round(((step+1)/questions.length)*100)+"%",background:"linear-gradient(90deg,"+CL.navy+","+CL.blueBright+")",borderRadius:2,transition:"width 0.5s"}}/></div>
            </div>
          </div>
          <div key={animKey} style={{maxWidth:560,margin:"0 auto",padding:"36px 16px 100px",animation:"slideIn 0.35s ease"}}>
            <span style={{display:"inline-block",background:CL.bluePale,color:CL.blue,border:"1px solid "+CL.borderBlue,borderRadius:20,padding:"3px 14px",fontSize:11,fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:14}}>{q.s}</span>
            <h2 style={{fontSize:"clamp(20px,4vw,30px)",fontWeight:700,color:CL.navy,marginBottom:8,lineHeight:1.25}}>{q.l}</h2>
            {q.type==="open"&&<p style={{fontSize:13,color:CL.muted,marginBottom:14}}>Click Next when ready.</p>}
            <div style={{marginBottom:26}}>
              {q.type==="mc"&&<McInput q={q} value={val} onChange={setVal}/>}
              {q.type==="open"&&<OpenInput q={q} value={val} onChange={setVal}/>}
              {q.type==="location"&&<LocationInput value={val} onChange={setVal}/>}
            </div>
            <div style={{display:"flex",gap:12,justifyContent:"space-between",flexWrap:"wrap"}}>
              <button onClick={()=>setStep(s=>s-1)} disabled={step===0} style={{background:"none",border:"1.5px solid "+CL.border,color:step===0?CL.border:CL.muted,borderRadius:12,padding:"12px 22px",fontSize:14,cursor:step===0?"default":"pointer",fontFamily:"inherit"}} onMouseEnter={e=>{if(step>0){e.currentTarget.style.borderColor=CL.blue;e.currentTarget.style.color=CL.blue;}}} onMouseLeave={e=>{e.currentTarget.style.borderColor=CL.border;e.currentTarget.style.color=CL.muted;}}><- Back</button>
              <button onClick={nextStep} disabled={!isValid()} style={{background:CL.navy,color:CL.white,border:"none",borderRadius:12,padding:"13px 32px",fontSize:15,fontWeight:700,cursor:"pointer",opacity:!isValid()?0.3:1,fontFamily:"inherit"}} onMouseEnter={e=>{if(isValid())e.currentTarget.style.background=CL.navyDark;}} onMouseLeave={e=>{e.currentTarget.style.background=CL.navy;}}>{step<questions.length-1?"Next ->":"Continue ->"}</button>
            </div>
          </div>
        </div>
      )}

      {/* MBTI PROMPT */}
      {phase==="mbti_prompt"&&(
        <div style={ps()}><Banner/>
          <div style={cs}>
            <div style={{maxWidth:480,width:"100%",textAlign:"center",animation:"fadeUp 0.5s ease"}}>
              <div style={{fontSize:48,marginBottom:16}}>[brain]</div>
              <h2 style={{fontSize:"clamp(22px,4vw,30px)",fontWeight:700,color:CL.navy,marginBottom:10}}>Want sharper recommendations?</h2>
              <p style={{fontSize:15,color:CL.muted,lineHeight:1.7,marginBottom:24}}>12 questions drawn from a pool of 60 reveal your MBTI founder type. Your ideas will be matched to how you think, decide, and lead.</p>
              <button onClick={()=>setPhase("mbti")} style={{width:"100%",background:"linear-gradient(135deg,"+CL.blue+","+CL.blueBright+")",color:CL.white,border:"none",borderRadius:14,padding:"15px",fontSize:16,fontWeight:700,cursor:"pointer",marginBottom:12,fontFamily:"inherit",boxShadow:"0 6px 24px "+CL.blue+"44"}}>Yes -- discover my type -></button>
              <button onClick={()=>generateIdeas()} style={{width:"100%",background:CL.white,border:"1.5px solid "+CL.border,color:CL.muted,borderRadius:12,padding:"13px",fontSize:15,cursor:"pointer",fontFamily:"inherit"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=CL.blue;e.currentTarget.style.color=CL.navy;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=CL.border;e.currentTarget.style.color=CL.muted;}}>Skip -- show me my ideas -></button>
            </div>
          </div>
        </div>
      )}

      {/* MBTI */}
      {phase==="mbti"&&(
        <div style={ps()}><Banner/>
          <div style={cs}>
            <div style={{maxWidth:520,width:"100%",animation:"fadeUp 0.4s ease"}}>
              <div style={{textAlign:"center",marginBottom:20}}>
                <h2 style={{fontSize:"clamp(20px,4vw,26px)",fontWeight:700,color:CL.navy,marginBottom:4}}>Personality Assessment</h2>
                <p style={{fontSize:13,color:CL.muted}}>Question {mbtiStep+1} of {mbtiQs.length} * drawn from a pool of 60</p>
              </div>
              <div style={{background:CL.white,borderRadius:20,border:"1.5px solid "+CL.border,padding:28,boxShadow:"0 4px 24px rgba(0,0,0,0.06)"}}>
                <div style={{height:4,background:CL.border,borderRadius:2,marginBottom:20,overflow:"hidden"}}><div style={{height:"100%",width:(mbtiStep/mbtiQs.length)*100+"%",background:"linear-gradient(90deg,"+CL.navy+","+CL.blueBright+")",borderRadius:2,transition:"width 0.4s"}}/></div>
                <h3 style={{fontSize:18,fontWeight:700,color:CL.navy,marginBottom:16,lineHeight:1.3}}>{mbtiQs[mbtiStep].l}</h3>
                <div style={{display:"flex",flexDirection:"column",gap:10}}>
                  {mbtiQs[mbtiStep].o.map(function(opt){ return(
                    <button key={opt.t} onClick={()=>{
                      const upd={...mbtiAns,[mbtiQs[mbtiStep].id]:opt.t};setMbtiAns(upd);
                      if(mbtiStep<mbtiQs.length-1){setMbtiStep(s=>s+1);}
                      else{setMbtiType(scoreMBTI(upd,mbtiQs));setPhase("reveal");}
                    }} style={{textAlign:"left",padding:"12px 18px",borderRadius:12,background:CL.white,border:"1.5px solid "+CL.border,fontSize:15,color:CL.textMid,cursor:"pointer",fontFamily:"inherit",transition:"all 0.15s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=CL.blue;e.currentTarget.style.background=CL.bluePale;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=CL.border;e.currentTarget.style.background=CL.white;}}>{opt.t}</button>
                  ); })}
                </div>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",marginTop:12}}>
                {mbtiStep>0?<button onClick={()=>setMbtiStep(s=>s-1)} style={{background:"none",border:"none",color:CL.muted,fontSize:14,cursor:"pointer",textDecoration:"underline"}}><- Back</button>:<div/>}
                <button onClick={()=>generateIdeas()} style={{background:"none",border:"none",color:CL.muted,fontSize:13,cursor:"pointer",textDecoration:"underline"}}>Skip to ideas -></button>
              </div>
            </div>
          </div>
        </div>
      )}

      {phase==="reveal"&&mbtiType&&<MBTIReveal type={mbtiType} onConfirm={()=>setPhase("scorecard")} onRetake={()=>{setMbtiStep(0);setMbtiAns({});setPhase("mbti");}}/>}
      {phase==="scorecard"&&<FounderScoreCard answers={answers} mbtiType={mbtiType} onContinue={()=>isDemoSession?generateIdeas():setPhase("email_gate")}/>}
      {phase==="email_gate"&&(
        <EmailGate
          email={emailInput}
          setEmail={setEmailInput}
          error={emailError}
          submitting={emailSubmitting}
          onSubmit={async()=>{
            const e=emailInput.trim().toLowerCase();
            if(!e||!/^[^@]+@[^@]+\.[^@]+$/.test(e)){setEmailError("Please enter a valid email address.");return;}
            setEmailError("");
            setEmailSubmitting(true);
            setFounderEmail(e);
            // Submit to Formspree (replace YOUR_FORM_ID with actual ID)
            try{
              await fetch("https://formspree.io/f/YOUR_FORM_ID",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                  email:e,
                  mbti:mbtiType||"Not assessed",
                  capital:answers.capital||"",
                  location:answers.location?.text||"",
                  source:"AieonFounder"
                })
              });
            }catch(err){console.warn("Email capture failed:",err);}
            setEmailCaptured(true);
            setEmailSubmitting(false);
            generateIdeas();
          }}
          onSkip={()=>{
            setEmailCaptured(false);
            generateIdeas();
          }}
          answers={answers}
          mbtiType={mbtiType}
        />
      )}
      {phase==="loading"&&<NarratedLoader answers={answers} mbtiType={mbtiType}/>}

      {/* CRUCIBLE */}
      {phase==="crucible"&&(
        <div style={ps()}>
          <Banner/>
          <div ref={crucibleTop} style={{maxWidth:640,margin:"0 auto",padding:"32px 16px 80px"}}>
            <div style={{textAlign:"center",marginBottom:28,position:"relative"}}>
              <button onClick={()=>setShowResetConfirm(true)} style={{position:"absolute",top:0,right:0,background:"none",border:"1px solid "+CL.border,borderRadius:8,padding:"5px 12px",fontSize:11,color:CL.muted,cursor:"pointer",fontFamily:"inherit"}}>New Session</button>
              <span style={{display:"inline-block",background:CL.bluePale,color:CL.blue,border:"1px solid "+CL.borderBlue,borderRadius:20,padding:"3px 14px",fontSize:11,fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:14}}>The Idea Crucible</span>
              <h2 style={{fontSize:"clamp(24px,5vw,34px)",fontWeight:700,color:CL.navy,marginBottom:10}}>React honestly to each idea</h2>
              <p style={{fontSize:15,color:CL.muted,lineHeight:1.6}}>Matched to your profile. Your gut reaction matters most.</p>
            </div>

            {/* Own ideas panel */}
            <div style={{background:"linear-gradient(135deg,"+CL.navy+","+CL.navyMid+")",borderRadius:18,padding:22,marginBottom:20,color:CL.white}}>
              <div style={{fontSize:11,color:CL.blueBright,letterSpacing:2,textTransform:"uppercase",fontFamily:"monospace",marginBottom:6}}>* Your Own Ideas ({ownIdeas.length}/5)</div>
              <h3 style={{fontSize:17,fontWeight:700,marginBottom:8}}>Already have something in mind?</h3>
              <p style={{fontSize:13,color:"rgba(255,255,255,0.6)",marginBottom:14,lineHeight:1.6}}>Add up to 5 of your own ideas -- your Board will evaluate them alongside the AI recommendations.</p>
              {ownIdeas.length>0&&(
                <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
                  {ownIdeas.map(idea=><div key={idea.id} style={{display:"flex",alignItems:"center",gap:10,background:"rgba(255,255,255,0.08)",borderRadius:10,padding:"10px 14px"}}>
                    <span style={{fontSize:13,color:CL.white,flex:1}}>[idea] {idea.title}</span>
                    <button onClick={()=>{setOwnIdeas(oi=>oi.filter(i=>i.id!==idea.id));setReactions(r=>{const nr={...r};delete nr[idea.id];return nr;});}} style={{background:"none",border:"none",color:"rgba(255,255,255,0.4)",cursor:"pointer",fontSize:13}}>x</button>
                  </div>)}
                </div>
              )}
              {ownIdeas.length<5&&(
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  <button onClick={()=>setPhase("own_idea")} style={{padding:"9px 18px",borderRadius:10,background:CL.blueBright,color:CL.white,border:"none",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>[idea] Add my idea</button>
                  <button onClick={()=>{setCraftChat([]);setPendingCraftIdea(null);setPhase("craft_idea");}} style={{padding:"9px 18px",borderRadius:10,background:"rgba(255,255,255,0.1)",color:CL.white,border:"1px solid rgba(255,255,255,0.2)",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>[chat] Help me craft an idea</button>
                </div>
              )}
              {ownIdeas.length>=5&&<div style={{fontSize:13,color:"rgba(255,255,255,0.5)",fontStyle:"italic"}}>Maximum 5 custom ideas reached.</div>}
            </div>

                        {/* F4 Reaction Heatmap toggle */}
            {Object.keys(reactions).length>=3&&(
              <div style={{marginBottom:16,textAlign:"center"}}>
                <button onClick={()=>setShowHeatmap(h=>!h)} style={{padding:"8px 20px",borderRadius:20,border:"1.5px solid "+(showHeatmap?"#3b82f6":"rgba(255,255,255,0.12)"),background:showHeatmap?"rgba(59,130,246,0.15)":"rgba(255,255,255,0.03)",color:showHeatmap?"#93c5fd":"rgba(255,255,255,0.5)",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit",transition:"all 0.2s"}}>
                  {showHeatmap?"^ Hide Pattern Analysis":"[chart] See My Reaction Patterns"}
                </button>
                {showHeatmap&&<ReactionHeatmap ideas={[...ideas,...ownIdeas]} reactions={reactions}/>}
              </div>
            )}
            <div style={{display:"flex",flexDirection:"column",gap:16,marginBottom:20}}>
              {allIdeas.map(idea=>{
                const r=reactions[idea.id];
                const evolved=evolvedIdea?.originalId===idea.id;
                const ai=evolved?{...idea,...evolvedIdea}:idea;
                const hasSections=!!(ai.concept||ai.story||ai.spendPlan||ai.moat);
                const isSimGroup=allIdeas.filter(i=>i.isSimilar).findIndex(i=>i.id===idea.id)===0&&idea.isSimilar;
                return(
                  <div key={idea.id}>
                    {isSimGroup&&<div style={{fontSize:11,color:CL.muted,fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:8,marginTop:4}}>Similar ideas based on your concept</div>}
                    <div style={{background:CL.white,borderRadius:16,border:"2px solid "+r==="excited"?CL.success:r==="no"?"#fca5a5":r==="unsure"?"#fcd34d":CL.border,padding:22,transition:"all 0.3s",boxShadow:r==="excited"?"0 4px 24px "+CL.success+"22":"none"}}>
                      <div style={{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap"}}>
                        {idea.isOwn&&<span style={{fontSize:10,color:CL.blue,background:CL.bluePale,border:"1px solid "+CL.borderBlue,borderRadius:20,padding:"2px 10px",fontWeight:700,textTransform:"uppercase"}}>Your Idea</span>}
                        {idea.isSimilar&&<span style={{fontSize:10,color:"#0891b2",background:"#ecfeff",border:"1px solid #a5f3fc",borderRadius:20,padding:"2px 10px",fontWeight:700,textTransform:"uppercase"}}>Similar Idea</span>}
                        {evolved&&<span style={{fontSize:10,color:CL.success,background:"#f0fdf4",border:"1px solid "+CL.success+"44",borderRadius:20,padding:"2px 10px",fontWeight:700,textTransform:"uppercase"}}>Refined</span>}
                      </div>
                      <h3 style={{fontWeight:800,color:CL.navy,fontSize:17,marginBottom:10,lineHeight:1.25}}>{ai.title}</h3>
                      {ai.reason&&<div style={{fontSize:12,color:CL.blue,background:CL.bluePale,border:"1px solid "+CL.borderBlue,borderRadius:8,padding:"5px 12px",marginBottom:10,lineHeight:1.5,display:"inline-block"}}>{"[target] "}{ai.reason}</div>}
                      {ai.insiderPitch&&<div style={{fontSize:13,color:"#0e7490",background:"#f0fdfa",border:"1px solid #a5f3fc",borderRadius:10,padding:"8px 14px",marginBottom:14,lineHeight:1.6,fontStyle:"italic"}}>{"[chat]"} {'"'}{ai.insiderPitch}{'"'}</div>}
                      {hasSections?(
                        <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:16}}>
                          {ai.concept&&<div><div style={{fontSize:10,color:CL.muted,fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:4}}>The Concept</div><div style={{fontSize:13,color:CL.textMid,lineHeight:1.75}}>{ai.concept}</div></div>}
                          {ai.story&&<div style={{background:CL.navy+"07",borderRadius:10,padding:"12px 16px",borderLeft:"3px solid "+CL.navy}}><div style={{fontSize:10,color:CL.navy,fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:4}}>The Story</div><div style={{fontSize:13,color:CL.textMid,lineHeight:1.75}}>{ai.story}</div></div>}
                          {ai.spendPlan&&<div><div style={{fontSize:10,color:CL.muted,fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:4}}>Your Spend Plan</div><div style={{fontSize:13,color:CL.textMid,lineHeight:1.75}}>{ai.spendPlan}</div></div>}
                          {ai.moat&&<div style={{background:"#fefce8",borderRadius:10,padding:"12px 16px",border:"1px solid #fde68a"}}><div style={{fontSize:10,color:"#92400e",fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:4}}>Why You Win</div><div style={{fontSize:13,color:"#78350f",lineHeight:1.75}}>{ai.moat}</div></div>}
                          <div style={{fontSize:11,color:CL.muted,fontStyle:"italic"}}>{"! AI-generated -- verify all market assumptions before committing capital."}</div>
                        </div>
                      ):(
                        <div style={{fontSize:13,color:CL.muted,lineHeight:1.75,marginBottom:16}}>{ai.description||""}</div>
                      )}
                      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                        {[{v:"excited",l:"[fire] Excited",bg:"#dcfce7",bc:"#86efac",tc:"#166534"},{v:"unsure",l:"[think] Unsure",bg:"#fef9c3",bc:"#fde047",tc:"#854d0e"},{v:"no",l:"X Not for me",bg:"#fee2e2",bc:"#fca5a5",tc:"#991b1b"}].map(function(btn){ return(
                          <button key={btn.v} onClick={()=>setReactions(rr=>({...rr,[idea.id]:btn.v}))} style={{padding:"6px 14px",borderRadius:20,border:"1.5px solid "+r===btn.v?btn.bc:CL.border,background:r===btn.v?btn.bg:CL.white,color:r===btn.v?btn.tc:CL.muted,fontSize:13,fontWeight:r===btn.v?700:400,cursor:"pointer",fontFamily:"inherit"}}>{btn.l}</button>
                        ); })}
                        {r&&r!=="no"&&!idea.isOwn&&!idea.isSimilar&&<button onClick={()=>{setExploring(ai);setEvolvedIdea(null);setExploreChat([{role:"assistant",content:"Tell me what's on your mind about "+ai.title+". What excites you? What concerns you?"}]);setPhase("explore");}} style={{padding:"6px 14px",borderRadius:20,border:"1.5px solid "+CL.blue,background:CL.bluePale,color:CL.blue,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>{"[chat] Explore ->"}</button>}
                        {idea.isOwn&&<button onClick={()=>generateSimilarIdeas(ai.concept||ai.description||ai.title,idea.id)} disabled={loadingSimilar===idea.id} style={{padding:"6px 14px",borderRadius:20,border:"1.5px solid #0891b2",background:"#ecfeff",color:"#0891b2",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit",opacity:loadingSimilar===idea.id?0.5:1}}>{loadingSimilar===idea.id?"[search] Finding...":"[search] Find similar ideas"}</button>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Lock section */}
            {excitedIdeas.length>0&&(
              <div style={{background:CL.white,borderRadius:14,border:"1.5px solid "+CL.border,padding:20,marginBottom:16}}>
                <div style={{fontSize:14,color:CL.muted,marginBottom:14}}>Ready to commit? Choose one to bring to your Board.</div>
                <div style={{display:"flex",flexDirection:"column",gap:10}}>
                  {excitedIdeas.map(function(idea){ return(
                    <button key={idea.id} onClick={()=>runBoard(idea)} style={{padding:"15px 20px",borderRadius:12,border:"2px solid "+CL.navy,background:CL.navy,color:CL.white,fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:"inherit",textAlign:"left",display:"flex",alignItems:"center",gap:12,transition:"all 0.2s"}} onMouseEnter={e=>e.currentTarget.style.background=CL.navyDark} onMouseLeave={e=>e.currentTarget.style.background=CL.navy}>
                      <span style={{fontSize:18}}>[fire]</span>
                      <div style={{flex:1}}><div style={{fontSize:11,opacity:0.6,marginBottom:2}}>Lock in & bring to my Board</div><div>{evolvedIdea?.originalId===idea.id?evolvedIdea.title:idea.title}</div></div>
                      <span>-></span>
                    </button>
                  ); })}
                </div>
              </div>
            )}

            {/* Re-roll panel */}
            {generateCount>0&&(
              <div style={{background:CL.offWhite,borderRadius:14,border:"1.5px solid "+CL.border,padding:20}}>
                {generateCount===1&&(
                  <div>
                    <div style={{fontWeight:700,color:CL.navy,fontSize:14,marginBottom:6}}>These didn't land?</div>
                    <p style={{fontSize:13,color:CL.muted,marginBottom:14,lineHeight:1.5}}>Try a fresh set at the same capital, or unlock a completely different category of ideas at a higher runway.</p>
                    <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                      <button onClick={()=>generateIdeas(undefined)} style={{background:CL.navy,color:CL.white,border:"none",borderRadius:10,padding:"10px 20px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>[sync] Regenerate Same Capital</button>
                      <button onClick={()=>generateIdeas("$25,000-$100,000")} style={{background:"linear-gradient(135deg,#7c3aed,#6d28d9)",color:"white",border:"none",borderRadius:10,padding:"10px 20px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>* Aspirational at $25K-$100K</button>
                      <button onClick={()=>generateIdeas("$100,000+")} style={{background:"linear-gradient(135deg,#d97706,#b45309)",color:"white",border:"none",borderRadius:10,padding:"10px 20px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>[bldg] Aspirational at $100K+</button>
                    </div>
                    <div style={{fontSize:11,color:CL.muted,marginTop:8,fontStyle:"italic"}}>Aspirational mode shows what's possible at higher capital -- franchise opportunities, brick-and-mortar, licensed practices, and more.</div>
                  </div>
                )}
                {generateCount===2&&(
                  <div>
                    <div style={{fontWeight:700,color:CL.navy,fontSize:14,marginBottom:6}}>One final generation</div>
                    <p style={{fontSize:13,color:CL.muted,marginBottom:14,lineHeight:1.5}}>Last attempt -- pick a capital tier and we'll push the ideas as far as possible.</p>
                    <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                      <button onClick={()=>generateIdeas("$25,000-$100,000")} style={{background:"linear-gradient(135deg,#7c3aed,#6d28d9)",color:"white",border:"none",borderRadius:10,padding:"10px 20px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>* $25K-$100K Ideas</button>
                      <button onClick={()=>generateIdeas("$100,000+")} style={{background:"linear-gradient(135deg,#d97706,#b45309)",color:"white",border:"none",borderRadius:10,padding:"10px 20px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>[bldg] $100K+ Ideas</button>
                    </div>
                  </div>
                )}
                {generateCount>=3&&(
                  <div>
                    <div style={{fontWeight:700,color:CL.navy,fontSize:14,marginBottom:6}}>Let's try a different approach</div>
                    <p style={{fontSize:13,color:CL.muted,marginBottom:14,lineHeight:1.5}}>You've seen 3 sets of ideas. The best next step is to discuss your own concept with the AI, or start fresh with a new quiz.</p>
                    <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                      <button onClick={()=>{setCraftChat([]);setPendingCraftIdea(null);setPhase("craft_idea");}} style={{background:CL.navy,color:CL.white,border:"none",borderRadius:10,padding:"10px 20px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>[chat] Discuss my own idea with AI</button>
                      <button onClick={()=>setShowResetConfirm(true)} style={{background:"none",border:"1.5px solid "+CL.border,color:CL.muted,borderRadius:10,padding:"10px 18px",fontSize:13,cursor:"pointer",fontFamily:"inherit"}}><- Retake the quiz</button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ADD OWN IDEA */}
      {phase==="own_idea"&&(
        <div style={ps()}><Banner/>
          <div style={cs}>
            <div style={{maxWidth:480,width:"100%"}}>
              <button onClick={()=>setPhase("crucible")} style={{background:"none",border:"none",color:CL.muted,fontSize:14,cursor:"pointer",marginBottom:16}}><- Back</button>
              <div style={{background:CL.white,borderRadius:20,border:"1.5px solid "+CL.border,padding:28}}>
                <h3 style={{fontSize:22,fontWeight:700,color:CL.navy,marginBottom:8}}>What's your idea?</h3>
                <p style={{fontSize:14,color:CL.muted,marginBottom:16,lineHeight:1.6}}>Describe it in as much detail as you can. The more specific, the better your Board's assessment will be.</p>
                <textarea id="own_idea_input" placeholder="What it is, who it serves, how it works, why it'll work..." rows={5} style={{width:"100%",padding:"14px",borderRadius:12,border:"1.5px solid "+CL.border,fontSize:15,color:CL.text,outline:"none",resize:"none",fontFamily:"inherit",lineHeight:1.7,marginBottom:14,transition:"border-color 0.2s"}} onFocus={e=>e.target.style.borderColor=CL.blue} onBlur={e=>e.target.style.borderColor=CL.border}/>
                <button onClick={()=>{
                  const txt=document.getElementById("own_idea_input")?.value?.trim();
                  if(!txt||ownIdeas.length>=5)return;
                  const newIdea={id:"own_"+Date.now(),title:txt.slice(0,70)+(txt.length>70?"...":""),description:txt,isOwn:true};
                  setOwnIdeas(oi=>[...oi,newIdea]);
                  setPhase("crucible");
                  setTimeout(()=>crucibleTop.current?.scrollIntoView({behavior:"smooth"}),100);
                }} style={{width:"100%",background:CL.navy,color:CL.white,border:"none",borderRadius:12,padding:"14px",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Add to my pool -></button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CRAFT IDEA */}
      {phase==="craft_idea"&&(
        <div style={{...ps(),display:"flex",flexDirection:"column"}}>
          <Banner/>
          <div style={{background:"linear-gradient(135deg,"+CL.navy+","+CL.navyMid+")",padding:"18px 20px",flexShrink:0}}>
            <div style={{maxWidth:600,margin:"0 auto"}}>
              <button onClick={()=>setPhase("crucible")} style={{background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.2)",color:"rgba(255,255,255,0.7)",borderRadius:8,padding:"5px 12px",fontSize:13,cursor:"pointer",marginBottom:10,fontFamily:"inherit"}}><- Back to ideas</button>
              <h3 style={{fontSize:18,fontWeight:700,color:CL.white,marginBottom:3}}>Let's craft your idea together</h3>
              <p style={{fontSize:12,color:"rgba(255,255,255,0.5)"}}>! For informational purposes only.</p>
            </div>
          </div>
          {/* Fixed bottom toast -- always visible regardless of scroll */}
          {pendingCraftIdea&&(
            <div style={{position:"fixed",bottom:0,left:0,right:0,background:CL.success,padding:"14px 20px",display:"flex",alignItems:"center",gap:12,zIndex:200,boxShadow:"0 -4px 20px rgba(0,0,0,0.25)"}}>
              <span style={{fontSize:22}}>[idea]</span>
              <div style={{flex:1}}>
                <div style={{fontSize:11,color:"rgba(255,255,255,0.8)",fontWeight:700,letterSpacing:1,textTransform:"uppercase"}}>IDEA SAVED -- TAP TO ADD</div>
                <div style={{fontSize:14,color:CL.white,fontWeight:600,marginTop:2}}>{pendingCraftIdea.title}</div>
              </div>
              <button onClick={()=>{
                if(ownIdeas.length>=5)return;
                setOwnIdeas(oi=>[...oi,pendingCraftIdea]);
                setPendingCraftIdea(null);
                setPhase("crucible");
                setTimeout(()=>crucibleTop.current?.scrollIntoView({behavior:"smooth"}),100);
              }} disabled={ownIdeas.length>=5} style={{background:"rgba(255,255,255,0.2)",color:CL.white,border:"1px solid rgba(255,255,255,0.3)",borderRadius:10,padding:"10px 18px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap",flexShrink:0}}>
                Add to pool ->
              </button>
            </div>
          )}
          <div style={{flex:1,overflowY:"auto",padding:"16px",paddingBottom:pendingCraftIdea?"80px":"16px"}}>
            <div style={{maxWidth:600,margin:"0 auto",display:"flex",flexDirection:"column",gap:12}}>
              {(craftChat.length?craftChat:[{role:"assistant",content:"Tell me about the rough concept you have in mind. What problem are you thinking about solving? What kind of work genuinely excites you right now?"}]).map(function(m,i){ return(
                <div key={i}>
                  <div style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
                    <div style={{maxWidth:"85%",padding:"11px 16px",borderRadius:14,background:m.role==="user"?CL.navy:CL.white,color:m.role==="user"?CL.white:CL.textMid,fontSize:14,lineHeight:1.7,border:m.role==="assistant"?"1px solid "+CL.border:"none"}}>{m.content}</div>
                  </div>
                  {m.role==="assistant"&&i>0&&(
                    <div style={{display:"flex",justifyContent:"flex-start",marginTop:6,marginLeft:4}}>
                      <button onClick={()=>{
                        const full=m.content;
                        const short=full.slice(0,70).trim()+(full.length>70?"...":"");
                        setPendingCraftIdea({id:"own_"+Date.now(),title:short,description:full,isOwn:true,craftedFromChat:true});
                      }} style={{fontSize:12,color:CL.blue,background:CL.bluePale,border:"1px solid "+CL.borderBlue,borderRadius:8,padding:"4px 12px",cursor:"pointer",fontFamily:"inherit",fontWeight:600}}>[idea] Use this as my idea</button>
                    </div>
                  )}
                </div>
              ); })}
              {craftLoading&&<div style={{display:"flex",gap:5,padding:"10px 14px",background:CL.white,borderRadius:12,border:"1px solid "+CL.border,width:"fit-content"}}>{[0,1,2].map(i=><div key={i} style={{width:7,height:7,borderRadius:"50%",background:CL.blue}}/>)}</div>}
              <div ref={craftBottom}/>
            </div>
          </div>
          <div style={{borderTop:"1px solid "+CL.border,padding:14,background:CL.white,flexShrink:0,paddingBottom:pendingCraftIdea?"80px":"14px"}}>
            <div style={{maxWidth:600,margin:"0 auto",display:"flex",gap:8}}>
              <input value={craftInput} onChange={e=>setCraftInput(e.target.value)} onKeyDown={async e=>{
                if(e.key!=="Enter"||!craftInput.trim()||craftLoading)return;
                const msg=craftInput.trim();setCraftInput("");setCraftLoading(true);
                const init=[{role:"assistant",content:"Tell me about your rough concept."}];
                const hist=[...(craftChat.length?craftChat:init),{role:"user",content:msg}];
                setCraftChat(hist);
                const reply=await callClaude("You are helping a founder develop their business idea through conversation. Be specific and encouraging. After 3-4 exchanges, suggest a concrete business concept name and description. Keep responses to 3-4 sentences. For informational purposes only.",hist.map(m=>m.role+": "+m.content).join("\n"));
                setCraftChat([...hist,{role:"assistant",content:reply}]);setCraftLoading(false);
              }} placeholder="Tell me more about your idea..." style={{flex:1,padding:"12px 16px",borderRadius:10,border:"1.5px solid "+CL.border,fontSize:14,color:CL.text,outline:"none",fontFamily:"inherit",transition:"border-color 0.2s"}} onFocus={e=>e.target.style.borderColor=CL.blue} onBlur={e=>e.target.style.borderColor=CL.border}/>
              <button onClick={async()=>{
                if(!craftInput.trim()||craftLoading)return;
                const msg=craftInput.trim();setCraftInput("");setCraftLoading(true);
                const init=[{role:"assistant",content:"Tell me about your rough concept."}];
                const hist=[...(craftChat.length?craftChat:init),{role:"user",content:msg}];
                setCraftChat(hist);
                const reply=await callClaude("Help a founder develop their business idea. Be specific. After a few exchanges, suggest a concrete business concept. 3-4 sentences. Informational only.",hist.map(m=>m.role+": "+m.content).join("\n"));
                setCraftChat([...hist,{role:"assistant",content:reply}]);setCraftLoading(false);
              }} disabled={!craftInput.trim()||craftLoading} style={{padding:"12px 20px",borderRadius:10,background:CL.navy,color:CL.white,border:"none",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"inherit",opacity:!craftInput.trim()||craftLoading?0.4:1}}>Send</button>
            </div>
          </div>
        </div>
      )}

      {/* EXPLORE */}
      {phase==="explore"&&(
        <div style={{...ps(),display:"flex",flexDirection:"column"}}>
          <Banner/>
          <div style={{background:"linear-gradient(135deg,"+CL.navy+","+CL.navyMid+")",padding:"18px 20px",flexShrink:0}}>
            <div style={{maxWidth:600,margin:"0 auto"}}>
              <button onClick={()=>setPhase("crucible")} style={{background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.2)",color:"rgba(255,255,255,0.7)",borderRadius:8,padding:"5px 12px",fontSize:13,cursor:"pointer",marginBottom:10,fontFamily:"inherit"}}><- Back to ideas</button>
              <h3 style={{fontSize:18,fontWeight:700,color:CL.white,marginBottom:3}}>Exploring: {exploring?.title}</h3>
              <p style={{fontSize:12,color:"rgba(255,255,255,0.5)"}}>! Informational only -- not legal or financial advice.</p>
            </div>
          </div>
          {evolvedIdea&&(
            <div style={{background:CL.success+"15",borderBottom:"1px solid "+CL.success+"44",padding:"12px 16px",display:"flex",alignItems:"center",gap:12,flexShrink:0}}>
              <span style={{fontSize:20}}>*</span>
              <div style={{flex:1}}><div style={{fontSize:11,color:CL.success,fontWeight:700,marginBottom:2}}>IDEA REFINED FROM THIS CONVERSATION</div><div style={{fontSize:14,color:CL.text,fontWeight:600}}>{evolvedIdea.title}</div></div>
              <button onClick={()=>setPhase("crucible")} style={{background:CL.success,color:CL.white,border:"none",borderRadius:10,padding:"8px 14px",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap"}}>View in pool -></button>
            </div>
          )}
          <div style={{flex:1,overflowY:"auto",padding:"16px"}}>
            <div style={{maxWidth:600,margin:"0 auto",display:"flex",flexDirection:"column",gap:12}}>
              {exploreChat.map(function(m,i){ return(
                <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
                  <div style={{maxWidth:"85%",padding:"11px 16px",borderRadius:14,background:m.role==="user"?CL.navy:CL.white,color:m.role==="user"?CL.white:CL.textMid,fontSize:14,lineHeight:1.7,border:m.role==="assistant"?"1px solid "+CL.border:"none"}}>{m.content}</div>
                </div>
              ); })}
              {exploreLoading&&<div style={{display:"flex",gap:5,padding:"10px 14px",background:CL.white,borderRadius:12,border:"1px solid "+CL.border,width:"fit-content"}}>{[0,1,2].map(i=><div key={i} style={{width:7,height:7,borderRadius:"50%",background:CL.blue}}/>)}</div>}
              {evolveLoading&&<div style={{padding:"12px 16px",background:CL.bluePale,borderRadius:12,border:"1px solid "+CL.borderBlue,fontSize:13,color:CL.blue,fontStyle:"italic"}}>* Refining your idea based on this conversation...</div>}
              <div ref={chatBottom}/>
            </div>
          </div>
          <div style={{borderTop:"1px solid "+CL.border,padding:14,background:CL.white,flexShrink:0}}>
            <div style={{maxWidth:600,margin:"0 auto"}}>
              <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
                {["What are the startup costs?","Who would my competitors be?","Is this right for my personality?","What would year 1 look like?"].map(function(qq){ return(
                  <button key={qq} onClick={async()=>{
                    if(exploreLoading)return;
                    const hist=[...exploreChat,{role:"user",content:qq}];setExploreChat(hist);setExploreLoading(true);
                    const sys="Honest business advisor. Idea: "+exploring?.title+" -- "+exploring?.description+". Founder: "+buildBrief()+". 3-5 sentences. End: \"! Informational only -- verify with qualified professionals.\"";
                    const reply=await callClaude(sys,hist.map(m=>m.role+": "+m.content).join("\n"));
                    setExploreChat([...hist,{role:"assistant",content:reply}]);setExploreLoading(false);
                  }} style={{padding:"5px 12px",borderRadius:20,border:"1px solid "+CL.borderBlue,background:CL.bluePale,color:CL.blue,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>{qq}</button>
                ); })}
              </div>
              {exploreChat.filter(m=>m.role==="user").length>=3&&!evolvedIdea&&!evolveLoading&&(
                <div style={{marginBottom:10,padding:"10px 14px",background:CL.bluePale,borderRadius:10,border:"1px solid "+CL.borderBlue,display:"flex",alignItems:"center",gap:10}}>
                  <span style={{fontSize:14}}>*</span>
                  <span style={{fontSize:13,color:CL.navy,flex:1}}>Want to update this idea based on what you've discovered in this conversation?</span>
                  <button onClick={async()=>{
                    setEvolveLoading(true);
                    const convo=exploreChat.map(m=>m.role+": "+m.content).join("\n");
                    const sys="Based on this exploration conversation about "+exploring?.title+", create a refined version incorporating the insights from the discussion. Return JSON: {\"title\":\"Refined title\",\"description\":\"2-3 specific sentences describing the evolved concept. End with: ! AI-generated.\",\"reason\":\"Refined based on [key insight from conversation]\"}";
                    const raw=await callClaude(sys,convo);
                    try{const parsed=JSON.parse(raw.split("\x60\x60\x60json").join("").split("\x60\x60\x60").join("").trim());setEvolvedIdea({...parsed,originalId:exploring?.id});}
                    catch{setEvolvedIdea({title:exploring?.title+" -- Refined",description:"Based on your conversation, the key insight is to focus more specifically on the niche angle discussed. ! AI-generated.",reason:"Refined based on your exploration conversation",originalId:exploring?.id});}
                    setEvolveLoading(false);
                  }} style={{background:CL.blue,color:CL.white,border:"none",borderRadius:8,padding:"7px 14px",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap"}}>Refine this idea -></button>
                </div>
              )}
              <div style={{display:"flex",gap:8}}>
                <input value={exploreInput} onChange={e=>setExploreInput(e.target.value)} onKeyDown={async e=>{
                  if(e.key!=="Enter"||!exploreInput.trim()||exploreLoading)return;
                  const msg=exploreInput.trim();setExploreInput("");setExploreLoading(true);
                  const hist=[...exploreChat,{role:"user",content:msg}];setExploreChat(hist);
                  const sys="Honest business advisor. Idea: "+exploring?.title+". Founder: "+buildBrief()+". 3-5 sentences. End: \"! Informational only.\"";
                  const reply=await callClaude(sys,hist.map(m=>m.role+": "+m.content).join("\n"));
                  setExploreChat([...hist,{role:"assistant",content:reply}]);setExploreLoading(false);
                }} placeholder="Ask about this idea..." style={{flex:1,padding:"12px 16px",borderRadius:10,border:"1.5px solid "+CL.border,fontSize:14,color:CL.text,outline:"none",fontFamily:"inherit",transition:"border-color 0.2s"}} onFocus={e=>e.target.style.borderColor=CL.blue} onBlur={e=>e.target.style.borderColor=CL.border}/>
              </div>
              <button onClick={()=>runBoard(evolvedIdea?{...exploring,title:evolvedIdea.title,description:evolvedIdea.description}:exploring)} style={{width:"100%",marginTop:12,padding:"13px",borderRadius:12,background:"linear-gradient(135deg,"+CL.blue+","+CL.blueBright+")",color:CL.white,border:"none",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{evolvedIdea?"Lock refined idea -> Meet my Board":"Lock this in -> Meet my Board"}</button>
            </div>
          </div>
        </div>
      )}

      {/* BOARD */}
      {phase==="board"&&!boardReady&&<LoadingAnimation advisorTexts={advisorTexts} loadingMap={loadingMap} lockedIdea={lockedIdea}/>}

      {phase==="board"&&boardReady&&(
        <div style={ps()}>
          <Banner/>
          <div style={{background:"linear-gradient(155deg,"+CL.navyDark+","+CL.navy+")",padding:"38px 16px 50px",marginBottom:-20}}>
            <div style={{maxWidth:840,margin:"0 auto",textAlign:"center"}}>
              {mbtiType&&<div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"6px 16px",marginBottom:12}}>
                <span style={{fontWeight:900,color:CL.white,fontSize:14}}>{mbtiType}</span><span style={{width:1,height:12,background:"rgba(255,255,255,0.2)"}}/><span style={{fontSize:12,color:"rgba(255,255,255,0.5)"}}>{MBTI_TYPES[mbtiType]?.name}</span>
              </div>}
              <div style={{fontSize:10,color:CL.blueBright,letterSpacing:3,textTransform:"uppercase",fontFamily:"monospace",marginBottom:8}}>Board Session</div>
              <h2 style={{fontSize:"clamp(20px,4vw,32px)",fontWeight:700,color:CL.white,marginBottom:6}}>{lockedIdea?.title}</h2>
              <p style={{fontSize:12,color:"rgba(255,255,255,0.4)"}}>! AI assessments -- not legal or financial advice</p>
            </div>
          </div>
          <div style={{maxWidth:840,margin:"0 auto",padding:"0 12px 60px"}}>
            <div style={{display:"grid",gap:16,gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",paddingTop:36}}>
              {ADVISORS.map(adv=><AdvisorCard key={adv.id} advisor={adv} text={advisorTexts[adv.id]} loading={!!loadingMap[adv.id]} canDebate={tier==="ignite"} lockedIdea={lockedIdea} brief={buildBrief()} onUpgradeClick={()=>setShowUpgrade(true)}/>)}
            </div>
            {synthesis&&(
              <div style={{marginTop:24}}>
                <div style={{background:"linear-gradient(135deg,"+CL.navy+","+CL.navyMid+")",borderRadius:18,padding:28,color:CL.white,marginBottom:16}}>
                  <div style={{fontSize:10,color:CL.blueBright,letterSpacing:3,textTransform:"uppercase",fontFamily:"monospace",marginBottom:16}}>Board Synthesis * AieonFounder</div>
                  {synthesis.archetype&&<div style={{display:"inline-block",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"8px 16px",marginBottom:16}}><div style={{fontSize:10,color:"rgba(255,255,255,0.5)",marginBottom:2,letterSpacing:1,textTransform:"uppercase"}}>FOUNDER ARCHETYPE</div><div style={{fontSize:15,fontWeight:700}}>{synthesis.archetype}</div></div>}
                  <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8,marginBottom:8}}>
                    <span style={{fontSize:13,color:"rgba(255,255,255,0.5)"}}>Survival Score</span>
                    <span style={{fontSize:22,fontWeight:900,color:synthesis.score>=70?CL.blueBright:synthesis.score>=50?"#fbbf24":"#f87171"}}>{synthesis.score}/100</span>
                  </div>
                  <div style={{height:6,background:"rgba(255,255,255,0.08)",borderRadius:3,overflow:"hidden",marginBottom:synthesis.score<50?14:20}}><div style={{height:"100%",width:synthesis.score+"%",background:"linear-gradient(90deg,"+CL.blue+","+CL.blueBright+")",borderRadius:3,transition:"width 1.2s"}}/></div>
                  {synthesis.score<50&&(
                    <div style={{background:"rgba(220,38,38,0.1)",border:"1px solid rgba(220,38,38,0.3)",borderRadius:12,padding:18,marginBottom:20}}>
                      <div style={{fontSize:11,color:"#f87171",fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:8}}>! Your Board has serious concerns</div>
                      <p style={{fontSize:14,color:"rgba(255,255,255,0.8)",lineHeight:1.65,marginBottom:14}}>A score below 50 means significant mismatches between this idea and your current profile. This doesn't mean it's impossible -- it means the idea needs more development, or a different fit may exist right now.</p>
                      <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                  <button onClick={()=>{setPhase("crucible");setBoardReady(false);setAdvisorTexts({});setSynthesis(null);setLoadingMap({});}} style={{padding:"10px 18px",borderRadius:10,background:"rgba(255,255,255,0.1)",color:CL.white,border:"1px solid rgba(255,255,255,0.2)",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>[sync] Explore my other ideas</button>
                        <button onClick={()=>setShowResetConfirm(true)} style={{padding:"10px 18px",borderRadius:10,background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.6)",border:"1px solid rgba(255,255,255,0.1)",fontSize:13,cursor:"pointer",fontFamily:"inherit"}}><- Start fresh</button>
                      </div>
                    </div>
                  )}
                  <div style={{display:"grid",gap:12,gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",marginBottom:16}}>
                    <div style={{background:"rgba(220,38,38,0.1)",border:"1px solid rgba(220,38,38,0.25)",borderRadius:12,padding:16}}>
                      <div style={{fontSize:10,color:"#f87171",letterSpacing:1,textTransform:"uppercase",marginBottom:6,fontWeight:700}}>Z Critical Action * 30 Days</div>
                      <div style={{fontSize:13,color:"rgba(255,255,255,0.82)",lineHeight:1.6}}>{synthesis.action}</div>
                    </div>
                    <div style={{background:"rgba(26,86,219,0.1)",border:"1px solid "+CL.blue+"33",borderRadius:12,padding:16}}>
                      <div style={{fontSize:10,color:CL.blueBright,letterSpacing:1,textTransform:"uppercase",marginBottom:6,fontWeight:700}}>* Hidden Strength</div>
                      <div style={{fontSize:13,color:"rgba(255,255,255,0.82)",lineHeight:1.6}}>{synthesis.strength}</div>
                    </div>
                    {synthesis.pivot&&<div style={{background:"rgba(16,185,129,0.08)",border:"1px solid rgba(16,185,129,0.2)",borderRadius:12,padding:16}}>
                      <div style={{fontSize:10,color:"#6ee7b7",letterSpacing:1,textTransform:"uppercase",marginBottom:6,fontWeight:700}}>-> If This Doesn't Work in 90 Days</div>
                      <div style={{fontSize:13,color:"rgba(255,255,255,0.82)",lineHeight:1.6}}>{synthesis.pivot}</div>
                    </div>}
                  </div>
                  <div style={{padding:"10px 14px",background:"rgba(255,165,0,0.1)",border:"1px solid rgba(255,165,0,0.2)",borderRadius:8,fontSize:12,color:"rgba(255,255,255,0.5)",lineHeight:1.5}}>
                    ! All content is AI-generated for informational purposes only. Not legal, financial, or professional advice. Always verify with licensed attorneys, CPAs, and business advisors before making decisions.
                  </div>
                </div>
              </div>
            )}

            {/* F3 -- 30 Day Roadmap */}
            {/* F3 -- 30 Day Roadmap -- Ignite only */}
            {tier==="ignite"&&roadmapLoading&&<div style={{marginTop:24,padding:"16px 20px",borderRadius:14,background:"linear-gradient(135deg,#0d1f4e,#152663)",border:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",gap:10}}><div style={{width:18,height:18,borderRadius:"50%",border:"2px solid rgba(255,255,255,0.1)",borderTopColor:"#3b6ef8",animation:"spin 1s linear infinite"}}/><div style={{fontSize:13,color:"rgba(255,255,255,0.6)"}}>Building your 30-day action plan...</div></div>}
            {tier==="ignite"&&roadmap&&lockedIdea&&<ThirtyDayRoadmap idea={lockedIdea} roadmap={roadmap}/>}
            {tier!=="ignite"&&synthesis&&(<div style={{marginTop:16,background:"linear-gradient(135deg,#0d1f4e,#152663)",borderRadius:14,padding:"18px 22px",border:"1px solid rgba(59,130,246,0.25)",display:"flex",alignItems:"center",gap:16}}><div style={{fontSize:26}}>[map]</div><div style={{flex:1}}><div style={{fontSize:14,fontWeight:700,color:"#fff",marginBottom:3}}>30-Day Action Roadmap</div><div style={{fontSize:12,color:"rgba(255,255,255,0.5)"}}>Your week-by-week launch plan, built around your locked idea.</div></div><button onClick={()=>setShowUpgrade(true)} style={{padding:"8px 18px",borderRadius:10,background:"linear-gradient(135deg,#1a56db,#3b82f6)",color:"#fff",border:"none",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap"}}>Z Unlock</button></div>)}

            {/* F5 -- Blindspot Report */}
            {/* F5 -- Blindspot Report -- Ignite only */}
            {tier==="ignite"&&!blindspots&&!blindspotsLoading&&synthesis&&(<div style={{marginTop:16,textAlign:"center"}}><button onClick={async()=>{setBlindspotsLoading(true);try{const r=await generateBlindspots(lockedIdea,{location:answers.location?.text,capital:answers.capital});if(r?.blindspots?.length)setBlindspots(r);}catch(e){console.warn(e);}finally{setBlindspotsLoading(false);}}} style={{padding:"10px 24px",borderRadius:10,background:"#fff",border:"1.5px solid #7c3aed",color:"#7c3aed",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>[search] Scan for Competitive Blindspots</button></div>)}






            {tier==="ignite"&&blindspotsLoading&&<div style={{marginTop:16,padding:"20px",borderRadius:14,background:"rgba(124,58,237,0.05)",border:"1px solid rgba(124,58,237,0.2)",display:"flex",alignItems:"center",gap:10}}><div style={{width:16,height:16,borderRadius:"50%",border:"2px solid rgba(124,58,237,0.2)",borderTopColor:"#7c3aed",animation:"spin 1s linear infinite"}}/><div style={{fontSize:13,color:"#7c3aed"}}>Scanning for competitive blindspots...</div></div>}
            {tier==="ignite"&&blindspots&&lockedIdea&&<BlindspotReport idea={lockedIdea} report={blindspots}/>}
            {tier!=="ignite"&&synthesis&&(<div style={{marginTop:12,background:"linear-gradient(135deg,#0f172a,#1e293b)",borderRadius:14,padding:"18px 22px",border:"1px solid rgba(124,58,237,0.25)",display:"flex",alignItems:"center",gap:16}}><div style={{fontSize:26}}>[search]</div><div style={{flex:1}}><div style={{fontSize:14,fontWeight:700,color:"#fff",marginBottom:3}}>Competitive Blindspot Report</div><div style={{fontSize:12,color:"rgba(255,255,255,0.5)"}}>3 real competitor gaps your advisors identified -- and how to exploit each one.</div></div><button onClick={()=>setShowUpgrade(true)} style={{padding:"8px 18px",borderRadius:10,background:"linear-gradient(135deg,#7c3aed,#6d28d9)",color:"#fff",border:"none",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap"}}>Z Unlock</button></div>)}
            {/* Copy Results + New Session -- always at the very bottom */}
            {synthesis&&(
              <div style={{marginTop:20,textAlign:"center",marginBottom:12}}>
                <button onClick={()=>setShowArc(true)} style={{padding:"13px 32px",borderRadius:12,background:"linear-gradient(135deg,#060d1f,#0d1f4e)",color:"#fff",border:"1px solid rgba(59,130,246,0.4)",fontSize:15,fontWeight:800,cursor:"pointer",fontFamily:"inherit",display:"inline-flex",alignItems:"center",gap:10}}>
                  <span>Z</span> View Your Founder Arc
                </button>
              </div>
            )}
            {synthesis&&(
              <div style={{marginTop:28,paddingTop:20,borderTop:"1px solid "+CL.border,display:"flex",gap:10,flexWrap:"wrap"}}>
                <button onClick={()=>{
                  const txt="AieonFounder -- The business you were built for.\n"+"-".repeat(40)+"\n"+(mbtiType?"Type: "+mbtiType+" -- "+(MBTI_TYPES[mbtiType]?.name||"")+"\n":"")+"\nLocked Idea: "+(lockedIdea?.title||"")+"\nSurvival Score: "+(synthesis?.score||"")+"/100\n\nCritical Action: "+(synthesis?.action||"")+"\nHidden Strength: "+(synthesis?.strength||"")+(synthesis?.pivot?"\nIf This Does Not Work in 90 Days: "+synthesis.pivot:"")+"\n\n! AI-generated -- not legal or financial advice.\nGenerated by AieonFounder * Powered by AieonLabs";
                  navigator.clipboard.writeText(txt).then(()=>alert("Results copied!")).catch(()=>{});
                }} style={{background:CL.navy,color:CL.white,border:"none",borderRadius:10,padding:"11px 20px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>[list] Copy Results</button>
                <button onClick={()=>setShowResetConfirm(true)} style={{background:CL.white,border:"1.5px solid "+CL.border,color:CL.muted,borderRadius:10,padding:"11px 18px",fontSize:13,cursor:"pointer",fontFamily:"inherit"}}><- New Session</button>
              </div>
            )}
          </div>
        </div>
      )}
  );
}

// ----------------------------------------------------------------
// PRICING PAGE
// ----------------------------------------------------------------
const C = {
  navy:"#0d1f4e", navyDark:"#080f2b", navyMid:"#152663",
  blue:"#1a56db", blueBright:"#3b82f6", teal:"#00d4c8",
  white:"#ffffff", offWhite:"#f8faff",
  text:"#0f172a", muted:"#64748b", border:"#e2e8f0",
  success:"#059669",
};


const SPARKS = [
  {l:"8%",  t:"15%", s:2,   bg:"#3b6ef8", dur:"1.8s", del:"0.0s", rot:-25},
  {l:"18%", t:"42%", s:3,   bg:"#3b6ef8", dur:"1.7s", del:"0.4s", rot:-30},
  {l:"28%", t:"22%", s:2,   bg:"#00d4c8", dur:"2.1s", del:"0.3s", rot:15},
  {l:"6%",  t:"65%", s:2,   bg:"#5588ff", dur:"1.9s", del:"0.7s", rot:40},
  {l:"38%", t:"10%", s:3,   bg:"#00f0e0", dur:"2.0s", del:"1.1s", rot:-10},
  {l:"52%", t:"28%", s:3,   bg:"#3b6ef8", dur:"1.9s", del:"0.8s", rot:10},
  {l:"62%", t:"18%", s:2,   bg:"#00d4c8", dur:"2.2s", del:"0.5s", rot:-40},
  {l:"72%", t:"38%", s:3,   bg:"#5588ff", dur:"2.0s", del:"1.0s", rot:25},
  {l:"82%", t:"12%", s:2,   bg:"#00f0e0", dur:"1.7s", del:"0.6s", rot:-20},
  {l:"88%", t:"55%", s:3,   bg:"#3b6ef8", dur:"1.8s", del:"0.9s", rot:30},
  {l:"92%", t:"30%", s:2,   bg:"#00d4c8", dur:"2.3s", del:"1.3s", rot:-35},
  {l:"4%",  t:"35%", s:2,   bg:"#5588ff", dur:"2.0s", del:"0.2s", rot:20},
  {l:"14%", t:"80%", s:2,   bg:"#3b6ef8", dur:"1.6s", del:"1.4s", rot:35},
  {l:"32%", t:"75%", s:2,   bg:"#00d4c8", dur:"1.9s", del:"0.3s", rot:-15},
  {l:"58%", t:"82%", s:2,   bg:"#5588ff", dur:"2.1s", del:"1.0s", rot:40},
  {l:"75%", t:"72%", s:2,   bg:"#00f0e0", dur:"1.8s", del:"0.5s", rot:-30},
  {l:"86%", t:"78%", s:2,   bg:"#3b6ef8", dur:"2.2s", del:"1.2s", rot:15},
  {l:"94%", t:"68%", s:2,   bg:"#00d4c8", dur:"1.7s", del:"0.8s", rot:-25},
  {l:"22%", t:"55%", s:3.5, bg:"#3b6ef8", dur:"1.7s", del:"0.4s", rot:35},
  {l:"45%", t:"65%", s:3.5, bg:"#00d4c8", dur:"1.6s", del:"0.9s", rot:-15},
  {l:"66%", t:"52%", s:3.5, bg:"#5588ff", dur:"1.9s", del:"1.2s", rot:25},
  {l:"78%", t:"22%", s:3.5, bg:"#00f0e0", dur:"1.8s", del:"0.6s", rot:-20},
  {l:"42%", t:"45%", s:5,   bg:"#3b6ef8", dur:"1.5s", del:"0.5s", rot:-10, anchor:true},
  {l:"58%", t:"35%", s:5,   bg:"#00d4c8", dur:"1.5s", del:"0.9s", rot:20,  anchor:true},
  {l:"3%",  t:"45%", s:2,   bg:"#5588ff", dur:"2.0s", del:"1.5s", rot:25},
  {l:"10%", t:"28%", s:2,   bg:"#00d4c8", dur:"1.8s", del:"0.2s", rot:-40},
  {l:"16%", t:"88%", s:2,   bg:"#3b6ef8", dur:"2.1s", del:"1.6s", rot:15},
  {l:"25%", t:"12%", s:2,   bg:"#00f0e0", dur:"1.7s", del:"0.4s", rot:-30},
  {l:"33%", t:"55%", s:2,   bg:"#5588ff", dur:"1.9s", del:"1.8s", rot:40},
  {l:"37%", t:"85%", s:2,   bg:"#3b6ef8", dur:"2.2s", del:"0.1s", rot:-20},
  {l:"44%", t:"25%", s:2,   bg:"#00d4c8", dur:"1.6s", del:"1.3s", rot:30},
  {l:"50%", t:"78%", s:2,   bg:"#5588ff", dur:"2.0s", del:"0.7s", rot:-15},
  {l:"55%", t:"48%", s:2,   bg:"#00f0e0", dur:"1.8s", del:"1.9s", rot:35},
  {l:"63%", t:"88%", s:2,   bg:"#3b6ef8", dur:"1.7s", del:"0.4s", rot:-25},
  {l:"70%", t:"60%", s:2,   bg:"#00d4c8", dur:"2.1s", del:"1.1s", rot:20},
  {l:"74%", t:"80%", s:2,   bg:"#5588ff", dur:"1.9s", del:"0.6s", rot:-35},
  {l:"80%", t:"45%", s:2,   bg:"#00f0e0", dur:"2.0s", del:"1.4s", rot:10},
  {l:"85%", t:"88%", s:2,   bg:"#3b6ef8", dur:"1.6s", del:"0.3s", rot:-20},
  {l:"91%", t:"62%", s:2,   bg:"#00d4c8", dur:"2.2s", del:"1.7s", rot:30},
  {l:"96%", t:"80%", s:2,   bg:"#5588ff", dur:"1.8s", del:"0.8s", rot:-10},
  {l:"20%", t:"68%", s:3,   bg:"#3b6ef8", dur:"1.9s", del:"1.2s", rot:25},
  {l:"30%", t:"40%", s:3,   bg:"#00d4c8", dur:"1.7s", del:"0.5s", rot:-30},
  {l:"53%", t:"15%", s:3,   bg:"#5588ff", dur:"2.0s", del:"1.0s", rot:40},
  {l:"70%", t:"15%", s:3,   bg:"#00f0e0", dur:"1.8s", del:"0.7s", rot:-15},
  {l:"84%", t:"30%", s:3,   bg:"#3b6ef8", dur:"1.6s", del:"1.3s", rot:20},
  {l:"96%", t:"48%", s:3,   bg:"#00d4c8", dur:"2.1s", del:"0.2s", rot:-35},
  {l:"25%", t:"92%", s:4,   bg:"#3b6ef8", dur:"1.5s", del:"0.6s", rot:15, anchor:true},
  {l:"75%", t:"90%", s:4,   bg:"#00d4c8", dur:"1.6s", del:"1.0s", rot:-25, anchor:true},
];

const FREE_FEATURES = [
  {icon:"[dna]",label:"Founder DNA Quiz",desc:"20 questions from a pool of 250"},
  {icon:"[brain]",label:"MBTI Founder Type",desc:"12 questions from a pool of 60"},
  {icon:"[chart]",label:"Founder ScoreCard",desc:"6-axis radar with archetype reveal"},
  {icon:"[fire]",label:"Idea Crucible",desc:"5 AI-matched ideas, 3 regenerations"},
  {icon:"[suit]",label:"Board of 5 Advisors",desc:"CFO, CMO, Legal, VC, Devil's Advocate"},
  {icon:"[lab]",label:"Idea Exploration",desc:"Evolve and craft your idea"},
  {icon:"Z",label:"Founder Arc preview",desc:"First milestone unlocked"},
];

const IGNITE_FEATURES = [
  {icon:"[chat]",label:"Board Debate",desc:"Push back on any advisor. They respond in character.",badge:null},
  {icon:"[map]",label:"30-Day Action Roadmap",desc:"Week-by-week launch plan, auto-generated after your board session.",badge:null},
  {icon:"[search]",label:"Competitive Blindspot Report",desc:"3 gaps your competitors missed and how to exploit them.",badge:null},
  {icon:"Z",label:"Full Founder Arc",desc:"All 25 milestones with AI guidance, challenges, and badges.",badge:null},
  {icon:"[cal]",label:"Daily Founder Brief",desc:"60-second daily read: one action, one market signal, one MBTI mindset note.",badge:"NEW"},
  {icon:"[mail]",label:"Weekly Founder Pulse",desc:"Your board checks in every Monday. One accountability question based on your last session.",badge:"NEW"},
  {icon:"[target]",label:"Daily Quote -- All 7 Voices",desc:"Every day, one branded quote from your board. CFO, CMO, Legal, VC, Devil's Advocate, Arc, and your MBTI type.",badge:"NEW"},
  {icon:"*",label:"XP & Level System",desc:"Earn XP for every action. 10 founder levels from Founder in Waiting to Arc Master.",badge:"NEW"},
  {icon:"[medal]",label:"Badge Collection",desc:"13 earnable badges across rarity tiers -- Common, Uncommon, Rare, Epic, and Legendary.",badge:"NEW"},
  {icon:"[gift]",label:"Giveaways & Prizes",desc:"Qualify for monthly draws, automatic awards, and the Arc Master prize as you hit milestones.",badge:"NEW"},
  {icon:"[up]",label:"Monthly Board Check-In",desc:"Return with real data. Your board updates its full assessment.",badge:null},
  {icon:"[seed]",label:"Early Access Intelligence",desc:"Grants, accelerators, and competitions matched to your profile.",badge:null},
  {icon:"[globe]",label:"Daily Pulse Community",desc:"One anonymous prompt per day shared with every Ignite member. Feeling check-ins, action accountability, founder philosophy. See aggregate responses and upvote what resonates.",badge:"NEW"},
  {icon:"[lab]",label:"Early Feature Access",desc:"Every new tool ships to Ignite members first.",badge:null},
  {icon:"[people]",label:"Founder Cohort",desc:"See how anonymous founders in your capital tier are progressing. Motivation without comparison.",badge:"SOON"},
];

const FAQS = [
  {q:"Is Free really free forever?",a:"Yes. No credit card, no trial period, no expiry. The free tier gives you a full session every time -- DNA quiz, ScoreCard, Idea Crucible, and a live 5-advisor board. Free forever means exactly that."},
  {q:"What makes Ignite worth $39/month?",a:"Ignite turns a one-time session into an ongoing operation. Here's what you get that Free doesn't: Board Debate (push back on any advisor, get a real second opinion), a 30-Day Action Roadmap generated after every session, a Competitive Blindspot Report (3 gaps your competitors missed), the full 25-milestone Founder Arc with AI guidance and badges, Daily Pulse community prompts (+15 XP each), the Review Drop Box (submit your pitch, copy, pricing, or business plan for AI review -- plus request a human review from the AieonLabs team, 3 per month), XP and a loyalty rewards system with free Ignite months as prizes, and the Daily Founder Brief. At $39/month, a single board session plus one roadmap review covers the cost of a 30-minute consult. Except this board never goes quiet."},
  {q:"On a new Ignite session, does it replace my old results?",a:"No -- it adds a new track. When you run a fresh session as an Ignite member, your previous board session and ScoreCard are preserved. You get a second business track with updated advisor perspectives. Over time, you build a full history of how your thinking evolved. Nothing gets overwritten."},
  {q:"What's the Daily Founder Brief?",a:"Every morning, a 60-second read built around your profile: one action from your board, one signal from your market, and one quote from one of your 7 advisor voices. Takes 60 seconds. Keeps you anchored."},
  {q:"What's the Daily Pulse?",a:"One anonymous community prompt per day -- rotating across three categories: Feeling Check-In, Action Check-In, and Discussion Topic. You get 3 prompts to choose from in each category. Submit anonymously, earn +15 XP, and see how other founders answered. It's the pulse of what the community is actually feeling and doing. One response per category per day."},
  {q:"What's the Review Drop Box?",a:"Submit anything you're working on -- a pitch deck, email, pricing page, business plan, or copy -- and your AI board reviews it with the same advisor voices from your session. Every Ignite member also gets 3 human review slots per month, where a member of the AieonLabs team personally reads your submission and adds a note within 48 hours."},
  {q:"Can I run a new session on Ignite?",a:"Yes. Ignite members can run fresh sessions anytime and bring updated answers. Your previous session is preserved as its own track -- nothing gets replaced. Every new session gives your board fresh context and can generate a new Roadmap and Blindspot Report."},
  {q:"What's in the Founder Arc?",a:"The Founder Arc is your guided path from idea to operating business -- 25 milestones across 5 phases: Formation, Validation, Operations, Growth, and Legacy. Each milestone opens a full-screen consultation with your Arc Guide, an AI consultant that leads you through the topic with specific questions, resources, and action steps. Entity setup, your first contract, hiring, reaching $10K -- each one is a real conversation, not a checklist. When you've done the work, you mark it complete and the AieonLabs logo appears on that milestone. Every conversation is saved as a Founder Record entry -- a structured log of the key decision you made and the action you committed to. That record builds over time into a picture of how you actually built your business. Ignite unlocks all 25 milestones. Free members get a preview of the first."},
  {q:"Is there an annual plan?",a:"Yes -- $249/year saves you 47% versus monthly. That's $20.75/month. Cancel anytime, no fees, no contracts."},
  {q:"Does AieonFounder work outside the US?",a:"Yes -- the entire platform works globally. The Founder DNA Quiz, board sessions, ScoreCard, Idea Crucible, Founder Arc, Daily Pulse, Review Drop Box, XP system, badges, and loyalty rewards all work everywhere in the world. The one area where the US has an edge is hyper-local market intelligence -- the board's knowledge of local regulations, business formation rules, and regional market conditions is most detailed for the US right now. That depth will expand globally over time. Everything else -- the community, the tools, the coaching -- is built for founders anywhere."},
  {q:"Is my data private?",a:"Your session data is never shared with third-party AI providers for training purposes. Your responses are used only to generate your personalized board session. Daily Pulse submissions are fully anonymous -- your name never appears. See our privacy policy for full details."},
  {q:"What's the Competitive Blindspot Report?",a:"After your board session, AieonFounder identifies 3 gaps your direct competitors have left open -- matched to your exact idea and market. Each gap comes with a specific exploitation strategy. Generated once per board session for Ignite members."},
  {q:"Can I cancel Ignite anytime?",a:"Yes. No contracts, no cancellation fees. Cancel from your account settings and your access continues until the end of your current billing period."},
  {q:"How does the XP and level system work?",a:"Every action earns XP -- completing milestones, answering your Daily Pulse, submitting to the Review Drop Box, and more. XP accumulates and moves you through founder levels, unlocking new badge tiers and making you eligible for loyalty reward draws. The more consistently you show up, the more the system rewards you."},
  {q:"What are the rewards?",a:"All AieonFounder rewards are Ignite loyalty benefits -- no cash prizes, just things that matter: free Ignite months, early access to Pro features, and Founder Spotlight features. Rewards are drawn monthly and quarterly based on XP milestones and streak achievements."},
  {q:"What are badges?",a:"Badges are permanent markers of what you've built and how you've shown up. There are 17 badges across 5 rarity tiers -- Common, Uncommon, Rare, Epic, and Legendary -- plus a daily Badge for the Daily Brief. They cover onboarding milestones, streak achievements, Arc phase completions, community contributions, and the Legendary Arc Master badge for completing all 25 milestones. They live on your profile permanently and never disappear."},
  {q:"What's the Daily Quote?",a:"Every day, one quote from your board delivered in the Daily Brief. 7 advisor voices rotate across the week -- CFO, CMO, Legal Counsel, Skeptical VC, Devil's Advocate, The Journey, and Your Founder Type. 276 quotes in the pool. The cinematic quote reveal in your portal shows it as a full-screen moment before your dashboard loads."},
];

function PricingPage({onNavigate}) {
  var [showIgnite, setShowIgnite] = useState(false);
  var [showIgnitePro, setShowIgnitePro] = useState(false);
  function goToApp(){ if(onNavigate) onNavigate("app"); else if(window.__aieonNavigate) window.__aieonNavigate("app"); }
  function goToContact(){ if(onNavigate) onNavigate("contact"); else if(window.__aieonNavigate) window.__aieonNavigate("contact"); }
  function goToIgnite(){ setShowIgnite(true); }
  function goToIgnitePro(){ setShowIgnitePro(true); }
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const monthly = 39;
  const annualTotal = 249;
  const annualPerMonth = (annualTotal / 12).toFixed(2);

  return(
    <div style={{fontFamily:"system-ui,-apple-system,sans-serif",background:C.offWhite,minHeight:"100vh"}}>
      {showIgnite&&<IgniteModal onClose={function(){setShowIgnite(false);}}/> }{showIgnitePro&&<IgniteProModal onClose={function(){setShowIgnitePro(false);}}/>}
      <GlobalStyle/>

      {/* Hero */}
      <div style={{background:"linear-gradient(160deg,#060d1f,#0d1f4e)",padding:"80px 24px 64px",textAlign:"center",position:"relative",overflow:"hidden"}}>
        {/* Constellation lines */}
        <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",overflow:"visible"}} xmlns="http://www.w3.org/2000/svg">
          <line x1="8%" y1="15%" x2="18%" y2="42%" stroke="#3b6ef8" strokeWidth="0.5" opacity="0.2"/>
          <line x1="18%" y1="42%" x2="42%" y2="45%" stroke="#00d4c8" strokeWidth="0.5" opacity="0.18"/>
          <line x1="42%" y1="45%" x2="58%" y2="35%" stroke="#3b6ef8" strokeWidth="0.5" opacity="0.22"/>
          <line x1="58%" y1="35%" x2="78%" y2="22%" stroke="#00d4c8" strokeWidth="0.4" opacity="0.18"/>
          <line x1="78%" y1="22%" x2="88%" y2="55%" stroke="#5588ff" strokeWidth="0.4" opacity="0.16"/>
          <line x1="18%" y1="42%" x2="22%" y2="55%" stroke="#00f0e0" strokeWidth="0.4" opacity="0.15"/>
          <line x1="42%" y1="45%" x2="45%" y2="65%" stroke="#3b6ef8" strokeWidth="0.4" opacity="0.15"/>
          <line x1="66%" y1="52%" x2="75%" y2="72%" stroke="#5588ff" strokeWidth="0.4" opacity="0.17"/>
          <line x1="3%" y1="45%" x2="8%" y2="15%" stroke="#5588ff" strokeWidth="0.4" opacity="0.15"/>
          <line x1="25%" y1="12%" x2="28%" y2="22%" stroke="#00d4c8" strokeWidth="0.4" opacity="0.16"/>
          <line x1="33%" y1="55%" x2="28%" y2="22%" stroke="#3b6ef8" strokeWidth="0.4" opacity="0.14"/>
          <line x1="53%" y1="15%" x2="58%" y2="35%" stroke="#5588ff" strokeWidth="0.4" opacity="0.15"/>
          <line x1="70%" y1="15%" x2="78%" y2="22%" stroke="#00d4c8" strokeWidth="0.4" opacity="0.16"/>
          <line x1="80%" y1="45%" x2="88%" y2="55%" stroke="#3b6ef8" strokeWidth="0.3" opacity="0.14"/>
          <line x1="45%" y1="65%" x2="33%" y2="55%" stroke="#00f0e0" strokeWidth="0.3" opacity="0.13"/>
          <line x1="22%" y1="55%" x2="45%" y2="65%" stroke="#5588ff" strokeWidth="0.3" opacity="0.13"/>
        </svg>
        {SPARKS.map(function(sp,i){ return(
          <div key={i} style={{position:"absolute",left:sp.l,top:sp.t,pointerEvents:"none",animation:"arcSpark "+sp.dur+" linear "+sp.del+" infinite",opacity:0}}>
            {/* Trail ellipse */}
            <div style={{position:"absolute", width:sp.s*3.5,height:sp.s*0.6, background:sp.bg, borderRadius:"50%", opacity:0.75, top:"50%",left:"50%", transform:"translate(-50%,-50%) rotate("+sp.rot+"deg)"}}/>








            {/* White hot core */}
            <div style={{position:"absolute", width:sp.s,height:sp.s, background:sp.anchor?"#ffffff":sp.bg, borderRadius:"50%", opacity:sp.anchor?0.95:0.88, top:"50%",left:"50%", transform:"translate(-50%,-50%)", boxShadow:sp.anchor?"0 0 "+(sp.s*2)+"px "+sp.bg+", 0 0 "+(sp.s*4)+"px rgba(255,255,255,0.4)":"0 0 "+(sp.s*1.5)+"px "+sp.bg}}/>









          </div>
        ); })}
        {[200,300].map(function(r,i){ return(
          <div key={i} style={{position:"absolute",width:r,height:r,borderRadius:"50%",border:"1px solid rgba(59,130,246,"+(0.15-i*0.05)+")",animation:"arcRing "+(4+i)+"s ease-in-out "+(i*1.5)+"s infinite",pointerEvents:"none"}}/>
        ); })}
        <div style={{position:"relative",zIndex:2}}>
          <div style={{fontSize:10,color:"#3b6ef8",letterSpacing:4,textTransform:"uppercase",fontFamily:"monospace",marginBottom:14}}>Pricing</div>
          <h1 style={{fontSize:"clamp(28px,5vw,48px)",fontWeight:900,color:"#fff",marginBottom:12,letterSpacing:"-0.5px",lineHeight:1.1}}>Start free.<br/>Upgrade when your board needs to stay active.</h1>
          <p style={{fontSize:16,color:"rgba(255,255,255,0.5)",maxWidth:480,margin:"0 auto 32px",lineHeight:1.7}}>Free gives you a full session. Ignite means your board never goes quiet.</p>

          {/* Toggle */}
          <div style={{display:"inline-flex",alignItems:"center",gap:12,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:40,padding:"6px 16px"}}>
            <button onClick={()=>setAnnual(false)} style={{padding:"6px 16px",borderRadius:30,background:!annual?"#1a56db":"transparent",color:!annual?"#fff":"rgba(255,255,255,0.4)",border:"none",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit",transition:"all 0.2s"}}>Monthly</button>
            <button onClick={()=>setAnnual(true)} style={{padding:"6px 16px",borderRadius:30,background:annual?"#1a56db":"transparent",color:annual?"#fff":"rgba(255,255,255,0.4)",border:"none",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit",transition:"all 0.2s",display:"flex",alignItems:"center",gap:6}}>
              Annual
              <span style={{fontSize:11,background:"#059669",color:"#fff",borderRadius:20,padding:"2px 8px",fontWeight:700}}>Save 47%</span>
            </button>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div style={{maxWidth:900,margin:"-32px auto 0",padding:"0 20px 60px",display:"flex",gap:20,flexWrap:"wrap",justifyContent:"center",position:"relative",zIndex:10}}>

        {/* Free */}
        <div style={{background:"#fff",borderRadius:20,border:"1.5px solid "+C.border,padding:"28px 24px",flex:1,minWidth:280,maxWidth:400,boxShadow:"0 4px 24px rgba(0,0,0,0.06)"}}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:3,textTransform:"uppercase",color:C.blue,marginBottom:12}}>Free</div>
          <div style={{fontSize:52,fontWeight:900,color:C.text,lineHeight:1,marginBottom:8}}>$0</div>
          <div style={{fontSize:13,color:C.muted,marginBottom:24,lineHeight:1.6}}>Full session, every time. No card, no expiry.</div>
          <button onClick={goToApp} style={{width:"100%",padding:"13px",borderRadius:11,background:C.navy,color:"#fff",border:"none",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"inherit",marginBottom:24}}>Start Free -></button>
          <div style={{fontSize:11,color:C.muted,fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:12}}>Includes</div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {FREE_FEATURES.map(function(f,i){ return(
              <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"8px 10px",borderRadius:10,background:"#f8faff"}}>
                <div style={{width:34,height:34,borderRadius:10,background:"linear-gradient(135deg,#eff6ff,#dbeafe)",border:"1px solid #bfdbfe",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>
                  {f.icon}
                </div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:700,color:C.text}}>{f.label}</div>
                  <div style={{fontSize:11,color:C.muted,marginTop:1}}>{f.desc}</div>
                </div>
              </div>
            ); })}
          </div>
        </div>

        {/* Ignite */}
        <div style={{background:"linear-gradient(155deg,#080f2b,#0d1f4e)",borderRadius:20,border:"1px solid rgba(59,130,246,0.35)",padding:"28px 24px",flex:1,minWidth:280,maxWidth:400,position:"relative",boxShadow:"0 24px 80px rgba(26,86,219,0.3)"}}>


          <div style={{fontSize:11,fontWeight:700,letterSpacing:3,textTransform:"uppercase",color:"#3b6ef8",marginBottom:12}}>Ignite</div>

          <div style={{display:"flex",alignItems:"flex-end",gap:6,marginBottom:4}}>
            <div style={{fontSize:52,fontWeight:900,color:"#fff",lineHeight:1}}>${annual?annualPerMonth:monthly}</div>
            <div style={{fontSize:14,color:"rgba(255,255,255,0.4)",marginBottom:8}}>/month</div>
          </div>

          {annual?(
            <div style={{marginBottom:8}}>
              <div style={{fontSize:12,color:"#00d4c8",fontWeight:700}}>$249 billed annually</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.4)",marginTop:2}}>That's $20.75/month * saves $219/year vs monthly</div>
            </div>
          ):(
            <div style={{marginBottom:8}}>
              <div style={{fontSize:12,color:"rgba(255,255,255,0.5)"}}>or $249/year -- just $20.75/month</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.4)",marginTop:2}}>Save 47% vs monthly billing</div>
            </div>
          )}

          <div style={{background:"rgba(0,212,200,0.08)",border:"1px solid rgba(0,212,200,0.2)",borderRadius:10,padding:"10px 14px",marginBottom:20}}>
            <div style={{fontSize:12,color:"#00d4c8",fontWeight:700,marginBottom:2}}>[unlock] Your board stays active.</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.45)",lineHeight:1.5}}>Daily briefs. Weekly check-ins. Monthly reassessments. Cancel anytime.</div>
          </div>

          <button onClick={goToIgnite} style={{width:"100%",padding:"13px",borderRadius:11,background:"linear-gradient(135deg,#1a56db,#3b82f6)",color:"#fff",border:"none",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"inherit",marginBottom:20,boxShadow:"0 6px 24px rgba(59,130,246,0.4)"}}>Upgrade to Ignite -></button>

          <div style={{fontSize:11,color:"rgba(255,255,255,0.45)",fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:12}}>Everything in Free, plus:</div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {IGNITE_FEATURES.map(function(f,i){ return(
              <div key={i} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"8px 10px",background:"rgba(255,255,255,0.04)",borderRadius:10,border:"1px solid rgba(255,255,255,0.06)"}}>
                <span style={{fontSize:15,flexShrink:0,marginTop:1}}>{f.icon}</span>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}>
                    <div style={{fontSize:13,fontWeight:700,color:"rgba(255,255,255,0.85)"}}>{f.label}</div>
                    {f.badge&&<span style={{fontSize:9,fontWeight:800,letterSpacing:1,color:f.badge==="SOON"?"rgba(255,255,255,0.3)":"#00d4c8",background:f.badge==="SOON"?"rgba(255,255,255,0.06)":"rgba(0,212,200,0.12)",border:"1px solid "+(f.badge==="SOON"?"rgba(255,255,255,0.08)":"rgba(0,212,200,0.3)"),borderRadius:4,padding:"1px 5px"}}>{f.badge}</span>}
                  </div>
                  <div style={{fontSize:11,color:"rgba(255,255,255,0.4)",lineHeight:1.5}}>{f.desc}</div>
                </div>
              </div>
            ); })}
          </div>
        </div>
      </div>

      {/* FAQ */}
      {/* Ignite Pro teaser */}
      <div style={{maxWidth:860,margin:"0 auto",padding:"0 20px 48px"}}>
        <div style={{background:"linear-gradient(135deg,#080f2b,#0d1f4e)",borderRadius:20,border:"1px solid rgba(255,255,255,0.08)",padding:"28px 32px",display:"flex",alignItems:"center",gap:24,flexWrap:"wrap"}}>
          <div style={{flex:1,minWidth:220}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
              <div style={{fontSize:11,fontWeight:700,letterSpacing:3,textTransform:"uppercase",color:"rgba(255,255,255,0.45)"}}>Coming Soon</div>
              <div style={{fontSize:10,background:"rgba(255,255,255,0.08)",color:"rgba(255,255,255,0.4)",borderRadius:20,padding:"2px 10px",fontWeight:700,letterSpacing:1}}>IGNITE PRO</div>
            </div>
            <div style={{fontSize:20,fontWeight:900,color:"#fff",marginBottom:6}}>AI + Human. For founders who want real eyes on their work.</div>
            <div style={{fontSize:13,color:"rgba(255,255,255,0.45)",lineHeight:1.7,marginBottom:12}}>Built for founders who are ready to go deeper. Early features in development include:</div>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {["[brain] Collective Intelligence -- see patterns across thousands of founder sessions","[earth] Global Market Simulator -- test your idea against international markets","[crystal] Founder Genome -- predictive modeling of your founder archetype over time","Z Advanced Arc AI -- real-time guidance that adapts as your business evolves","[bldg] Entity Formation Engine -- AI-guided business structure and filing"].map(function(item,i){ return(
                <div key={i} style={{fontSize:12,color:"rgba(255,255,255,0.5)",display:"flex",alignItems:"flex-start",gap:6,lineHeight:1.5}}>{item}</div>
              ); })}
            </div>
          </div>
          <div style={{textAlign:"center",flexShrink:0}}>
            <div style={{fontSize:28,fontWeight:900,color:"rgba(255,255,255,0.45)",marginBottom:4}}>$99<span style={{fontSize:14,fontWeight:400}}>/mo</span></div>
            <button onClick={goToIgnitePro} style={{padding:"10px 24px",borderRadius:10,background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)",color:"rgba(255,255,255,0.5)",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>
              Join the Waitlist ->
            </button>
            <div style={{fontSize:10,color:"rgba(255,255,255,0.5)",marginTop:6}}>Launching when Ignite reaches scale</div>
          </div>
        </div>
      </div>

      <div style={{maxWidth:680,margin:"0 auto",padding:"0 20px 80px"}}>
        <div style={{textAlign:"center",marginBottom:40}}>
          <div style={{fontSize:11,color:C.blue,letterSpacing:3,textTransform:"uppercase",fontFamily:"monospace",marginBottom:10}}>FAQ</div>
          <h2 style={{fontSize:"clamp(24px,4vw,36px)",fontWeight:900,color:C.text,letterSpacing:"-0.3px"}}>Questions worth asking.</h2>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {FAQS.map(function(faq,i){ return(
            <div key={i} style={{background:"#fff",borderRadius:14,border:"1.5px solid "+(openFaq===i?C.blue:C.border),overflow:"hidden",transition:"border 0.2s"}}>
              <button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{width:"100%",padding:"16px 20px",background:"none",border:"none",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",fontFamily:"inherit",textAlign:"left"}}>
                <span style={{fontSize:14,fontWeight:700,color:C.text,lineHeight:1.4,paddingRight:12}}>{faq.q}</span>
                <span style={{fontSize:18,color:C.blue,flexShrink:0,transform:openFaq===i?"rotate(45deg)":"none",transition:"transform 0.2s"}}>+</span>
              </button>
              {openFaq===i&&(
                <div style={{padding:"0 20px 16px",fontSize:13,color:C.muted,lineHeight:1.75,borderTop:"1px solid "+C.border,paddingTop:14}}>{faq.a}</div>
              )}
            </div>
          ); })}
        </div>
      </div>

      {/* Footer CTA */}
      <div style={{maxWidth:860,margin:"0 auto",padding:"0 20px 32px"}}>
        <div style={{padding:"14px 18px",background:"#f8faff",borderRadius:12,border:"1px solid #e2e8f0",fontSize:11,color:"#64748b",lineHeight:1.75}}>
          <strong style={{color:"#0f172a"}}>! AI Disclaimer:</strong> AieonFounder uses AI to generate all session content including ideas, board assessments, scorecards, and roadmaps. This content is for informational purposes only and does not constitute professional advice. AI outputs may contain errors or hallucinations. Prices in USD. AieonFounder is currently optimized for US-based founders. AI outputs may contain errors or hallucinations and do not constitute professional advice. <br/><br/><strong>[gift] Rewards Program:</strong> All AieonFounder rewards and draws are product loyalty benefits available exclusively to active Ignite members. All prizes are Ignite subscription credits or recognition benefits -- no cash or cash-equivalent prizes are offered. Rewards are non-transferable and have no monetary value outside the platform.
        </div>
      </div>
      <div style={{background:"linear-gradient(135deg,#080f2b,#0d1f4e)",padding:"60px 24px",textAlign:"center"}}>
        <div style={{fontSize:11,color:"#3b6ef8",letterSpacing:3,textTransform:"uppercase",fontFamily:"monospace",marginBottom:12}}>Ready?</div>
        <h2 style={{fontSize:"clamp(24px,4vw,40px)",fontWeight:900,color:"#fff",marginBottom:16,letterSpacing:"-0.5px"}}>Start free. No card required.</h2>
        <p style={{fontSize:15,color:"rgba(255,255,255,0.45)",marginBottom:32,lineHeight:1.7}}>Take the quiz, meet your board, and find the business you were built for.</p>
        <button onClick={goToApp} style={{padding:"15px 48px",borderRadius:14,background:"linear-gradient(135deg,#1a56db,#00d4c8)",color:"#fff",border:"none",fontSize:16,fontWeight:800,cursor:"pointer",fontFamily:"inherit",boxShadow:"0 8px 32px rgba(26,86,219,0.4)"}}>Start Free -></button>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------
// CONTACT PAGE
// ----------------------------------------------------------------
const CP = {
  navy:"#0d1f4e", navyDark:"#080f2b", blue:"#1a56db",
  teal:"#00d4c8", white:"#ffffff", offWhite:"#f8faff",
  text:"#0f172a", muted:"#64748b", border:"#e2e8f0",
};


const SPARKS2=[
  {l:"6%",t:"18%",s:3,bg:"#00d4c8",dur:"2.6s",del:"0s"},
  {l:"90%",t:"24%",s:4,bg:"#3b6ef8",dur:"3.1s",del:"0.5s"},
  {l:"14%",t:"72%",s:2,bg:"#5588ff",dur:"2.4s",del:"1.0s"},
  {l:"83%",t:"68%",s:3,bg:"#00f0e0",dur:"3.3s",del:"1.5s"},
  {l:"50%",t:"8%",s:4,bg:"#00d4c8",dur:"2.9s",del:"0.8s"},
  {l:"94%",t:"52%",s:2,bg:"#3b6ef8",dur:"3.2s",del:"1.2s"},
];

const CONTACT_OPTIONS=[
  {icon:"[chat]",label:"General Inquiry",value:"general",desc:"Questions about AieonFounder or AieonLabs"},
  {icon:"Z",label:"Ignite / Billing",value:"billing",desc:"Subscription questions, upgrades, cancellations"},
  {icon:"[bug]",label:"Report a Bug",value:"bug",desc:"Something isn't working the way it should"},
  {icon:"[hand]",label:"Partnership",value:"partnership",desc:"Business development, integrations, press"},
  {icon:"[bldg]",label:"Enterprise",value:"enterprise",desc:"Custom AI solutions for your organization"},
];

const FEATURE_CATEGORIES=[
  {icon:"[dna]",label:"Quiz & Profiling"},
  {icon:"[chart]",label:"ScoreCard & MBTI"},
  {icon:"[fire]",label:"Idea Crucible"},
  {icon:"[suit]",label:"Board of Advisors"},
  {icon:"Z",label:"Founder Arc"},
  {icon:"[cal]",label:"Daily / Weekly Features"},
  {icon:"[mobile]",label:"Mobile Experience"},
  {icon:"[tool]",label:"Something Else"},
];

function ContactForm(){
  const[type,setType]=useState("");
  const[form,setForm]=useState({name:"",email:"",message:""});
  const[submitted,setSubmitted]=useState(false);
  const[submitting,setSubmitting]=useState(false);

  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const valid=type&&form.name&&form.email&&form.message&&/^[^@]+@[^@]+\.[^@]+$/.test(form.email);

  const submit=async()=>{
    if(!valid||submitting)return;
    setSubmitting(true);
    try{
      await fetch("https://formspree.io/f/YOUR_CONTACT_FORM_ID",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({...form,type,source:"AieonFounder Contact"})
      });
    }catch(e){}
    setSubmitting(false);
    setSubmitted(true);
  };

  if(submitted){ return(
    <div style={{textAlign:"center",padding:"48px 24px",animation:"fadeUp 0.5s ease"}}>
      <div style={{fontSize:48,marginBottom:16}}>OK</div>
      <div style={{fontSize:20,fontWeight:800,color:CP.text,marginBottom:8}}>Message received.</div>
      <div style={{fontSize:14,color:CP.muted,lineHeight:1.7,maxWidth:360,margin:"0 auto"}}>We'll get back to you within 1 business day. If it's urgent, email us directly at <strong>info@aieonlabs.com</strong></div>
    </div>
  ); }

  return(
    <div>
      <div style={{marginBottom:20}}>
        <div style={{fontSize:12,fontWeight:700,color:CP.text,marginBottom:10}}>What can we help with?</div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {CONTACT_OPTIONS.map(function(opt){ return(
            <button key={opt.value} onClick={()=>setType(opt.value)} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",borderRadius:12,border:"1.5px solid "+(type===opt.value?CP.blue:CP.border),background:type===opt.value?"#eff6ff":"#fff",cursor:"pointer",fontFamily:"inherit",textAlign:"left",transition:"all 0.15s"}}>
              <span style={{fontSize:18,flexShrink:0}}>{opt.icon}</span>
              <div>
                <div style={{fontSize:13,fontWeight:700,color:type===opt.value?CP.blue:CP.text}}>{opt.label}</div>
                <div style={{fontSize:11,color:CP.muted,marginTop:1}}>{opt.desc}</div>
              </div>
              {type===opt.value&&<span style={{marginLeft:"auto",color:CP.blue,fontSize:16}}>v</span>}
            </button>
          ); })}
        </div>
      </div>

      <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:16}}>
        <input value={form.name} onChange={e=>set("name",e.target.value)} placeholder="Your name" style={{width:"100%",padding:"13px 16px",borderRadius:12,border:"1.5px solid "+CP.border,background:"#fff",fontSize:14,color:CP.text,transition:"border 0.2s"}}/>
        <input type="email" value={form.email} onChange={e=>set("email",e.target.value)} placeholder="your@email.com" style={{width:"100%",padding:"13px 16px",borderRadius:12,border:"1.5px solid "+CP.border,background:"#fff",fontSize:14,color:CP.text,transition:"border 0.2s"}}/>
        <textarea value={form.message} onChange={e=>set("message",e.target.value)} placeholder="Tell us what's on your mind..." rows={5} style={{width:"100%",padding:"13px 16px",borderRadius:12,border:"1.5px solid "+CP.border,background:"#fff",fontSize:14,color:CP.text,resize:"vertical",transition:"border 0.2s"}}/>
      </div>

      <button onClick={submit} disabled={!valid||submitting} style={{width:"100%",padding:"14px",borderRadius:12,background:valid&&!submitting?"linear-gradient(135deg,#1a56db,#00d4c8)":"#e2e8f0",color:valid&&!submitting?"#fff":"#94a3b8",border:"none",fontSize:15,fontWeight:700,cursor:valid&&!submitting?"pointer":"default",fontFamily:"inherit",transition:"all 0.2s",boxShadow:valid&&!submitting?"0 6px 24px rgba(26,86,219,0.35)":"none"}}>
        {submitting?"Sending...":"Send Message ->"}
      </button>
    </div>
  );
}

function FeatureSuggestionForm(){
  const[category,setCategory]=useState("");
  const[form,setForm]=useState({email:"",title:"",description:"",impact:""});
  const[submitted,setSubmitted]=useState(false);
  const[submitting,setSubmitting]=useState(false);
  const[upvoted,setUpvoted]=useState([]);

  const POPULAR=[
    {id:1,title:"Mobile app (iOS/Android)",votes:47,tag:"Mobile"},
    {id:2,title:"Team/co-founder mode",votes:38,tag:"Collaboration"},
    {id:3,title:"Export to PDF",votes:31,tag:"Export"},
    {id:4,title:"Spanish language support",votes:29,tag:"International"},
    {id:5,title:"Investor pitch deck generator",votes:24,tag:"Ignite"},
    {id:6,title:"Integration with Notion",votes:19,tag:"Integrations"},
  ];

  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const valid=category&&form.email&&form.title&&form.description&&/^[^@]+@[^@]+\.[^@]+$/.test(form.email);

  const submit=async()=>{
    if(!valid||submitting)return;
    setSubmitting(true);
    try{
      await fetch("https://formspree.io/f/YOUR_FEATURE_FORM_ID",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({...form,category,source:"AieonFounder Feature Request"})
      });
    }catch(e){}
    setSubmitting(false);
    setSubmitted(true);
  };

  const toggleUpvote=(id)=>{
    setUpvoted(u=>u.includes(id)?u.filter(x=>x!==id):[...u,id]);
  };

  return(
    <div>
      {/* Popular requests */}
      <div style={{marginBottom:28}}>
        <div style={{fontSize:12,fontWeight:700,color:CP.text,marginBottom:4}}>Most requested right now</div>
        <div style={{fontSize:11,color:CP.muted,marginBottom:12}}>Upvote to signal what matters most to you.</div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {POPULAR.map(req=>{
            const voted=upvoted.includes(req.id);
            return(
              <div key={req.id} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderRadius:12,border:"1.5px solid "+(voted?CP.blue:CP.border),background:voted?"#eff6ff":"#fff",transition:"all 0.15s"}}>
                <button onClick={()=>toggleUpvote(req.id)} style={{flexShrink:0,width:36,height:36,borderRadius:10,background:voted?"#1a56db":"#f8faff",border:"1.5px solid "+(voted?CP.blue:CP.border),color:voted?"#fff":CP.muted,fontSize:12,fontWeight:800,cursor:"pointer",fontFamily:"inherit",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",lineHeight:1,gap:1,transition:"all 0.15s"}}>
                  <span style={{fontSize:10}}>^</span>
                  <span>{req.votes+(voted?1:0)}</span>
                </button>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:600,color:CP.text}}>{req.title}</div>
                  <div style={{fontSize:11,color:CP.muted,marginTop:1}}>{req.tag}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {submitted?(
        <div style={{textAlign:"center",padding:"32px 0",animation:"fadeUp 0.5s ease"}}>
          <div style={{fontSize:40,marginBottom:12}}>[clap]</div>
          <div style={{fontSize:17,fontWeight:800,color:CP.text,marginBottom:6}}>Request submitted.</div>
          <div style={{fontSize:13,color:CP.muted,lineHeight:1.7}}>We review every suggestion. If it gets enough traction we'll add it to the roadmap and notify you.</div>
        </div>
      ):(
        <div>
          <div style={{fontSize:12,fontWeight:700,color:CP.text,marginBottom:10}}>Submit your own idea</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14}}>
            {FEATURE_CATEGORIES.map(function(cat){ return(
              <button key={cat.label} onClick={()=>setCategory(cat.label)} style={{padding:"6px 12px",borderRadius:20,border:"1.5px solid "+(category===cat.label?CP.blue:CP.border),background:category===cat.label?"#eff6ff":"#fff",color:category===cat.label?CP.blue:CP.muted,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:5,transition:"all 0.15s"}}>
                {cat.icon} {cat.label}
              </button>
            ); })}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>
            <input type="email" value={form.email} onChange={e=>set("email",e.target.value)} placeholder="your@email.com (we'll notify you if it ships)" style={{width:"100%",padding:"12px 16px",borderRadius:12,border:"1.5px solid "+CP.border,fontSize:13,color:CP.text,background:"#fff"}}/>
            <input value={form.title} onChange={e=>set("title",e.target.value)} placeholder="Feature title -- short and specific" style={{width:"100%",padding:"12px 16px",borderRadius:12,border:"1.5px solid "+CP.border,fontSize:13,color:CP.text,background:"#fff"}}/>
            <textarea value={form.description} onChange={e=>set("description",e.target.value)} placeholder="Describe the feature. What problem does it solve for you?" rows={3} style={{width:"100%",padding:"12px 16px",borderRadius:12,border:"1.5px solid "+CP.border,fontSize:13,color:CP.text,resize:"vertical",background:"#fff"}}/>
            <input value={form.impact} onChange={e=>set("impact",e.target.value)} placeholder="How would this change your session? (optional)" style={{width:"100%",padding:"12px 16px",borderRadius:12,border:"1.5px solid "+CP.border,fontSize:13,color:CP.text,background:"#fff"}}/>
          </div>
          <button onClick={submit} disabled={!valid||submitting} style={{width:"100%",padding:"13px",borderRadius:12,background:valid&&!submitting?"linear-gradient(135deg,"+CP.navy+","+CP.blue+")":"#e2e8f0",color:valid&&!submitting?"#fff":"#94a3b8",border:"none",fontSize:14,fontWeight:700,cursor:valid&&!submitting?"pointer":"default",fontFamily:"inherit",transition:"all 0.2s"}}>
            {submitting?"Submitting...":"Submit Feature Request ->"}
          </button>
        </div>
      )}
    </div>
  );
}

function ContactPage(){
  const[tab,setTab]=useState("contact");
  return(
    <div style={{minHeight:"100vh",background:CP.offWhite,fontFamily:"system-ui,sans-serif"}}>
      <GlobalStyle/>

      {/* Hero */}
      <div style={{background:"linear-gradient(160deg,#060d1f,#0d1f4e)",padding:"72px 24px 56px",textAlign:"center",position:"relative",overflow:"hidden"}}>
        {/* Contact constellation lines */}
        <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",overflow:"visible"}} xmlns="http://www.w3.org/2000/svg">
          <line x1="5%" y1="20%" x2="22%" y2="35%" stroke="#8b5cf6" strokeWidth="0.5" opacity="0.2"/>
          <line x1="22%" y1="35%" x2="40%" y2="45%" stroke="#6366f1" strokeWidth="0.5" opacity="0.18"/>
          <line x1="40%" y1="45%" x2="65%" y2="50%" stroke="#8b5cf6" strokeWidth="0.5" opacity="0.22"/>
          <line x1="65%" y1="50%" x2="90%" y2="40%" stroke="#6366f1" strokeWidth="0.4" opacity="0.18"/>
          <line x1="12%" y1="60%" x2="35%" y2="75%" stroke="#a78bfa" strokeWidth="0.4" opacity="0.16"/>
          <line x1="60%" y1="65%" x2="82%" y2="70%" stroke="#8b5cf6" strokeWidth="0.4" opacity="0.15"/>
          <line x1="48%" y1="15%" x2="40%" y2="45%" stroke="#6366f1" strokeWidth="0.4" opacity="0.15"/>
        </svg>
        {SPARKS2.map(function(sp,i){ return(
          <div key={i} style={{position:"absolute",left:sp.l,top:sp.t,pointerEvents:"none",animation:"arcSpark "+sp.dur+" linear "+sp.del+" infinite",opacity:0}}><div style={{position:"absolute",width:sp.s*3.5,height:sp.s*0.6,background:sp.bg,borderRadius:"50%",opacity:0.7,top:"50%",left:"50%",transform:"translate(-50%,-50%) rotate("+sp.rot+"deg)"}}/><div style={{position:"absolute",width:sp.s,height:sp.s,background:sp.anchor?"#fff":sp.bg,borderRadius:"50%",opacity:0.88,top:"50%",left:"50%",transform:"translate(-50%,-50%)",boxShadow:"0 0 "+(sp.s*1.5)+"px "+sp.bg}}/></div>
        ); })}
        <div style={{position:"relative",zIndex:2}}>
          <div style={{fontSize:10,color:"#3b6ef8",letterSpacing:4,textTransform:"uppercase",fontFamily:"monospace",marginBottom:12}}>AieonLabs * AieonFounder</div>
          <h1 style={{fontSize:"clamp(26px,5vw,44px)",fontWeight:900,color:"#fff",marginBottom:10,letterSpacing:"-0.5px"}}>Get in touch.</h1>
          <p style={{fontSize:15,color:"rgba(255,255,255,0.5)",maxWidth:440,margin:"0 auto",lineHeight:1.7}}>We're a small team. Every message goes to a real person.</p>

          <div style={{display:"flex",justifyContent:"center",gap:24,marginTop:28,flexWrap:"wrap"}}>
            {[{icon:"[email]",label:"info@aieonlabs.com",href:"mailto:info@aieonlabs.com"},{icon:"[globe]",label:"aieonlabs.com",href:"https://aieonlabs.com"}].map(function(link,i){ return(
              <a key={i} href={link.href} style={{display:"flex",alignItems:"center",gap:6,fontSize:13,color:"rgba(255,255,255,0.5)",textDecoration:"none",transition:"color 0.2s"}}>
                <span>{link.icon}</span>{link.label}
              </a>
            ); })}
          </div>
        </div>
      </div>

      {/* Tab toggle */}
      <div style={{maxWidth:620,margin:"0 auto",padding:"0 20px"}}>
        <div style={{display:"flex",background:"#fff",border:"1.5px solid "+CP.border,borderRadius:14,padding:4,margin:"24px 0",gap:4}}>
          {[{id:"contact",label:"[mail] Contact Us"},{id:"features",label:"[idea] Suggest a Feature"}].map(function(t){ return(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,padding:"11px",borderRadius:10,background:tab===t.id?CP.navy:"transparent",color:tab===t.id?"#fff":CP.muted,border:"none",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit",transition:"all 0.2s"}}>
              {t.label}
            </button>
          ); })}
        </div>

        <div style={{background:"#fff",borderRadius:18,border:"1.5px solid "+CP.border,padding:"24px",marginBottom:48,boxShadow:"0 4px 24px rgba(0,0,0,0.05)"}}>
          {tab==="contact"?<ContactForm/>:<FeatureSuggestionForm/>}
        </div>
      </div>

      {/* Response time note */}
      <div style={{maxWidth:620,margin:"0 auto",padding:"0 20px 8px"}}>
        <div style={{padding:"12px 16px",background:"#f8faff",borderRadius:12,border:"1px solid #e2e8f0",fontSize:11,color:"#64748b",lineHeight:1.7}}>
          <strong style={{color:"#0f172a"}}>! Disclaimer:</strong> AieonFounder is an AI-powered platform. All AI-generated content is for informational purposes only and does not constitute professional advice. For legal, financial, or medical matters, please consult a qualified professional. Feature requests are reviewed but not guaranteed for implementation.
        </div>
      </div>
      <div style={{textAlign:"center",padding:"0 24px 48px"}}>
        <div style={{display:"inline-flex",gap:24,flexWrap:"wrap",justifyContent:"center"}}>
          {[{icon:"Z",text:"Response within 1 business day"},{icon:"[lock]",text:"We never share your info"},{icon:"",text:"Based in New Jersey"}].map(function(item,i){ return(
            <div key={i} style={{display:"flex",alignItems:"center",gap:6,fontSize:12,color:CP.muted}}>
              <span>{item.icon}</span>{item.text}
            </div>
          ); })}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------
// ROOT APP - ROUTER
// ----------------------------------------------------------------
export default function AieonFounderApp() {
  var router = useRouter();
  
  // Override CTA buttons in landing to use router
  // Pass navigate as prop context via window (simple approach for wrapper)
  useEffect(function() {
    window.__aieonNavigate = router.navigate;
    return function() { delete window.__aieonNavigate; };
  }, [router.navigate]);
  
  return(
    <div style={{paddingTop:52,minHeight:"100vh",fontFamily:"system-ui,-apple-system,sans-serif"}}>
      <NavBar page={router.page} navigate={router.navigate} goBack={router.goBack}/>
      {router.page === "landing"  && <LandingPage  onNavigate={router.navigate}/>}
      {router.page === "app"      && <MainApp/>}
      {router.page === "pricing"  && <PricingPage onNavigate={router.navigate}/>}
      {router.page === "contact"  && <ContactPage/>}
    </div>
  );
}

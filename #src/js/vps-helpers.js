const getIcon = {
	'Оперативная память': `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
  <path opacity="0.2" d="M15.1875 10.6875V14.0625C15.1875 14.2117 15.1282 14.3548 15.0227 14.4602C14.9173 14.5657 14.7742 14.625 14.625 14.625H3.375C3.22582 14.625 3.08274 14.5657 2.97725 14.4602C2.87176 14.3548 2.8125 14.2117 2.8125 14.0625V10.6875C2.8125 10.5383 2.87176 10.3952 2.97725 10.2898C3.08274 10.1843 3.22582 10.125 3.375 10.125H14.625C14.7742 10.125 14.9173 10.1843 15.0227 10.2898C15.1282 10.3952 15.1875 10.5383 15.1875 10.6875ZM14.625 3.375H3.375C3.22582 3.375 3.08274 3.43426 2.97725 3.53975C2.87176 3.64524 2.8125 3.78832 2.8125 3.9375V7.3125C2.8125 7.46168 2.87176 7.60476 2.97725 7.71025C3.08274 7.81574 3.22582 7.875 3.375 7.875H14.625C14.7742 7.875 14.9173 7.81574 15.0227 7.71025C15.1282 7.60476 15.1875 7.46168 15.1875 7.3125V3.9375C15.1875 3.78832 15.1282 3.64524 15.0227 3.53975C14.9173 3.43426 14.7742 3.375 14.625 3.375Z" fill="#1A1A1A"/>
  <path d="M14.625 9.5625H3.375C3.07663 9.5625 2.79048 9.68103 2.5795 9.892C2.36853 10.103 2.25 10.3891 2.25 10.6875V14.0625C2.25 14.3609 2.36853 14.647 2.5795 14.858C2.79048 15.069 3.07663 15.1875 3.375 15.1875H14.625C14.9234 15.1875 15.2095 15.069 15.4205 14.858C15.6315 14.647 15.75 14.3609 15.75 14.0625V10.6875C15.75 10.3891 15.6315 10.103 15.4205 9.892C15.2095 9.68103 14.9234 9.5625 14.625 9.5625ZM14.625 14.0625H3.375V10.6875H14.625V14.0625ZM14.625 2.8125H3.375C3.07663 2.8125 2.79048 2.93103 2.5795 3.142C2.36853 3.35298 2.25 3.63913 2.25 3.9375V7.3125C2.25 7.61087 2.36853 7.89702 2.5795 8.108C2.79048 8.31897 3.07663 8.4375 3.375 8.4375H14.625C14.9234 8.4375 15.2095 8.31897 15.4205 8.108C15.6315 7.89702 15.75 7.61087 15.75 7.3125V3.9375C15.75 3.63913 15.6315 3.35298 15.4205 3.142C15.2095 2.93103 14.9234 2.8125 14.625 2.8125ZM14.625 7.3125H3.375V3.9375H14.625V7.3125ZM13.5 5.625C13.5 5.79188 13.4505 5.95501 13.3578 6.09376C13.2651 6.23252 13.1333 6.34066 12.9791 6.40452C12.825 6.46838 12.6553 6.48509 12.4916 6.45254C12.328 6.41998 12.1776 6.33962 12.0596 6.22162C11.9416 6.10362 11.8613 5.95328 11.8287 5.78961C11.7962 5.62594 11.8129 5.45629 11.8767 5.30211C11.9406 5.14794 12.0487 5.01616 12.1875 4.92345C12.3262 4.83073 12.4894 4.78125 12.6562 4.78125C12.88 4.78125 13.0946 4.87014 13.2529 5.02838C13.4111 5.18661 13.5 5.40122 13.5 5.625ZM13.5 12.375C13.5 12.5419 13.4505 12.705 13.3578 12.8438C13.2651 12.9825 13.1333 13.0907 12.9791 13.1545C12.825 13.2184 12.6553 13.2351 12.4916 13.2025C12.328 13.17 12.1776 13.0896 12.0596 12.9716C11.9416 12.8536 11.8613 12.7033 11.8287 12.5396C11.7962 12.3759 11.8129 12.2063 11.8767 12.0521C11.9406 11.8979 12.0487 11.7662 12.1875 11.6734C12.3262 11.5807 12.4894 11.5312 12.6562 11.5312C12.88 11.5312 13.0946 11.6201 13.2529 11.7784C13.4111 11.9366 13.5 12.1512 13.5 12.375Z" fill="#1A1A1A"/>
</svg>`,
	'IPv4-адреса': `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
  <path opacity="0.2" d="M16.875 9C16.875 10.4918 16.2824 11.9226 15.2275 12.9775C14.1726 14.0324 12.7419 14.625 11.25 14.625H5.06253C4.50422 14.6243 3.95244 14.5049 3.4438 14.2747C2.93516 14.0445 2.4813 13.7087 2.11232 13.2897C1.74334 12.8707 1.46769 12.378 1.30366 11.8444C1.13963 11.3107 1.09096 10.7482 1.16089 10.1943C1.23082 9.6404 1.41775 9.10769 1.70927 8.63154C2.00079 8.15538 2.39024 7.74666 2.85178 7.4325C3.31331 7.11835 3.83638 6.90593 4.38627 6.80936C4.93617 6.71278 5.50031 6.73425 6.04128 6.87234V6.87937C6.5335 5.67204 7.42984 4.67319 8.57704 4.05362C9.72424 3.43405 11.051 3.23224 12.3306 3.4827C13.6101 3.73316 14.7629 4.42033 15.5918 5.42671C16.4208 6.43309 16.8743 7.69618 16.875 9Z" fill="#1A1A1A"/>
  <path d="M11.25 2.8125C10.1009 2.81338 8.97465 3.13392 7.99728 3.73828C7.01991 4.34263 6.22994 5.20696 5.71571 6.23461C5.10396 6.14539 4.48039 6.18318 3.88389 6.34562C3.2874 6.50806 2.73077 6.79166 2.24873 7.17874C1.76669 7.56583 1.36958 8.04808 1.08216 8.59543C0.79475 9.14277 0.6232 9.74347 0.578214 10.3601C0.533228 10.9766 0.615772 11.5959 0.820696 12.1791C1.02562 12.7624 1.34853 13.2972 1.76928 13.7501C2.19003 14.2031 2.6996 14.5645 3.2662 14.8118C3.8328 15.0591 4.44429 15.187 5.0625 15.1875H11.25C12.891 15.1875 14.4648 14.5356 15.6252 13.3752C16.7856 12.2148 17.4375 10.641 17.4375 9C17.4375 7.35897 16.7856 5.78516 15.6252 4.62478C14.4648 3.4644 12.891 2.8125 11.25 2.8125ZM11.25 14.0625H5.0625C4.1674 14.0625 3.30895 13.7069 2.67602 13.074C2.04308 12.4411 1.68751 11.5826 1.68751 10.6875C1.68751 9.79239 2.04308 8.93395 2.67602 8.30101C3.30895 7.66808 4.1674 7.3125 5.0625 7.3125C5.13985 7.3125 5.21719 7.3125 5.29383 7.32023C5.14001 7.86689 5.06217 8.43212 5.0625 9C5.0625 9.14918 5.12177 9.29226 5.22726 9.39775C5.33275 9.50324 5.47582 9.5625 5.625 9.5625C5.77419 9.5625 5.91726 9.50324 6.02275 9.39775C6.12824 9.29226 6.1875 9.14918 6.1875 9C6.1875 7.99873 6.48442 7.01995 7.04069 6.18743C7.59696 5.3549 8.38762 4.70603 9.31267 4.32286C10.2377 3.93969 11.2556 3.83944 12.2377 4.03477C13.2197 4.23011 14.1217 4.71227 14.8297 5.42027C15.5377 6.12828 16.0199 7.03033 16.2152 8.01236C16.4106 8.99438 16.3103 10.0123 15.9271 10.9373C15.544 11.8624 14.8951 12.653 14.0626 13.2093C13.2301 13.7656 12.2513 14.0625 11.25 14.0625ZM13.898 7.47703C13.9503 7.52927 13.9918 7.59131 14.0201 7.6596C14.0484 7.72788 14.0629 7.80108 14.0629 7.875C14.0629 7.94892 14.0484 8.02212 14.0201 8.0904C13.9918 8.15869 13.9503 8.22073 13.898 8.27297L10.523 11.648C10.4707 11.7003 10.4087 11.7418 10.3404 11.7701C10.2721 11.7984 10.1989 11.8129 10.125 11.8129C10.0511 11.8129 9.97789 11.7984 9.9096 11.7701C9.84132 11.7418 9.77928 11.7003 9.72704 11.648L8.03954 9.96047C7.93399 9.85492 7.87469 9.71177 7.87469 9.5625C7.87469 9.41323 7.93399 9.27008 8.03954 9.16453C8.14508 9.05898 8.28824 8.99969 8.4375 8.99969C8.58677 8.99969 8.72993 9.05898 8.83547 9.16453L10.125 10.4548L13.102 7.47703C13.1543 7.42473 13.2163 7.38324 13.2846 7.35494C13.3529 7.32663 13.4261 7.31206 13.5 7.31206C13.5739 7.31206 13.6471 7.32663 13.7154 7.35494C13.7837 7.38324 13.8457 7.42473 13.898 7.47703Z" fill="#1A1A1A"/>
</svg>`,
	'Количество процессоров': `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
  <path opacity="0.2" d="M14.625 2.8125H3.375C3.22582 2.8125 3.08274 2.87176 2.97725 2.97725C2.87176 3.08274 2.8125 3.22582 2.8125 3.375V14.625C2.8125 14.7742 2.87176 14.9173 2.97725 15.0227C3.08274 15.1282 3.22582 15.1875 3.375 15.1875H14.625C14.7742 15.1875 14.9173 15.1282 15.0227 15.0227C15.1282 14.9173 15.1875 14.7742 15.1875 14.625V3.375C15.1875 3.22582 15.1282 3.08274 15.0227 2.97725C14.9173 2.87176 14.7742 2.8125 14.625 2.8125ZM6.1875 12.9375C5.965 12.9375 5.74749 12.8715 5.56248 12.7479C5.37748 12.6243 5.23328 12.4486 5.14814 12.243C5.06299 12.0375 5.04071 11.8113 5.08412 11.593C5.12752 11.3748 5.23467 11.1743 5.392 11.017C5.54934 10.8597 5.74979 10.7525 5.96802 10.7091C6.18625 10.6657 6.41245 10.688 6.61802 10.7731C6.82359 10.8583 6.99929 11.0025 7.1229 11.1875C7.24652 11.3725 7.3125 11.59 7.3125 11.8125C7.3125 12.1109 7.19397 12.397 6.983 12.608C6.77202 12.819 6.48587 12.9375 6.1875 12.9375ZM11.8125 8.4375C11.59 8.4375 11.3725 8.37152 11.1875 8.2479C11.0025 8.12429 10.8583 7.94859 10.7731 7.74302C10.688 7.53745 10.6657 7.31125 10.7091 7.09302C10.7525 6.87479 10.8597 6.67434 11.017 6.517C11.1743 6.35967 11.3748 6.25252 11.593 6.20912C11.8113 6.16571 12.0375 6.18799 12.243 6.27314C12.4486 6.35828 12.6243 6.50248 12.7479 6.68748C12.8715 6.87249 12.9375 7.09 12.9375 7.3125C12.9375 7.61087 12.819 7.89702 12.608 8.108C12.397 8.31897 12.1109 8.4375 11.8125 8.4375Z" fill="#1A1A1A"/>
  <path d="M14.625 2.25H3.375C3.07663 2.25 2.79048 2.36853 2.5795 2.5795C2.36853 2.79048 2.25 3.07663 2.25 3.375V14.625C2.25 14.9234 2.36853 15.2095 2.5795 15.4205C2.79048 15.6315 3.07663 15.75 3.375 15.75H14.625C14.9234 15.75 15.2095 15.6315 15.4205 15.4205C15.6315 15.2095 15.75 14.9234 15.75 14.625V3.375C15.75 3.07663 15.6315 2.79048 15.4205 2.5795C15.2095 2.36853 14.9234 2.25 14.625 2.25ZM6.1875 11.25C6.29875 11.25 6.40751 11.283 6.50001 11.3448C6.59251 11.4066 6.66461 11.4945 6.70718 11.5972C6.74976 11.7 6.7609 11.8131 6.73919 11.9222C6.71749 12.0314 6.66391 12.1316 6.58525 12.2102C6.50658 12.2889 6.40635 12.3425 6.29724 12.3642C6.18812 12.3859 6.07502 12.3748 5.97224 12.3322C5.86946 12.2896 5.78161 12.2175 5.7198 12.125C5.65799 12.0325 5.625 11.9238 5.625 11.8125C5.625 11.6633 5.68426 11.5202 5.78975 11.4148C5.89524 11.3093 6.03832 11.25 6.1875 11.25ZM3.375 3.375H5.625V10.222C5.24969 10.3547 4.93338 10.6158 4.73196 10.9592C4.53054 11.3025 4.45699 11.706 4.5243 12.0984C4.59162 12.4907 4.79547 12.8466 5.09982 13.1032C5.40417 13.3598 5.78943 13.5005 6.1875 13.5005C6.58557 13.5005 6.97083 13.3598 7.27518 13.1032C7.57953 12.8466 7.78338 12.4907 7.8507 12.0984C7.91801 11.706 7.84446 11.3025 7.64304 10.9592C7.44162 10.6158 7.12531 10.3547 6.75 10.222V8.10773L10.125 11.4827V14.625H3.375V3.375ZM14.625 14.625H11.25V11.25C11.2501 11.1761 11.2356 11.1029 11.2073 11.0346C11.1791 10.9664 11.1377 10.9043 11.0855 10.852L6.75 6.51727V3.375H9V5.0625C8.99994 5.13639 9.01444 5.20957 9.04267 5.27785C9.0709 5.34614 9.11231 5.40819 9.16453 5.46047L10.2895 6.58547C10.1806 6.81231 10.1243 7.06085 10.125 7.3125C10.125 7.64626 10.224 7.97252 10.4094 8.25002C10.5948 8.52753 10.8584 8.74382 11.1667 8.87155C11.4751 8.99927 11.8144 9.03269 12.1417 8.96758C12.4691 8.90246 12.7697 8.74174 13.0057 8.50574C13.2417 8.26974 13.4025 7.96906 13.4676 7.64172C13.5327 7.31437 13.4993 6.97507 13.3715 6.66672C13.2438 6.35837 13.0275 6.09482 12.75 5.9094C12.4725 5.72397 12.1463 5.625 11.8125 5.625C11.5608 5.62456 11.3123 5.68105 11.0855 5.79023L10.125 4.82977V3.375H14.625V14.625ZM11.8125 6.75C11.9238 6.75 12.0325 6.78299 12.125 6.8448C12.2175 6.90661 12.2896 6.99446 12.3322 7.09724C12.3748 7.20002 12.3859 7.31312 12.3642 7.42224C12.3425 7.53135 12.2889 7.63158 12.2102 7.71025C12.1316 7.78891 12.0314 7.84249 11.9222 7.86419C11.8131 7.8859 11.7 7.87476 11.5972 7.83218C11.4945 7.78961 11.4066 7.71751 11.3448 7.62501C11.283 7.53251 11.25 7.42375 11.25 7.3125C11.25 7.16332 11.3093 7.02024 11.4148 6.91475C11.5202 6.80926 11.6633 6.75 11.8125 6.75Z" fill="#1A1A1A"/>
</svg>`,
	'Дисковое пространство': `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
  <path opacity="0.2" d="M16.3125 5.625V12.375C16.3125 12.5242 16.2532 12.6673 16.1477 12.7727C16.0423 12.8782 15.8992 12.9375 15.75 12.9375H2.25C2.10082 12.9375 1.95774 12.8782 1.85225 12.7727C1.74676 12.6673 1.6875 12.5242 1.6875 12.375V5.625C1.6875 5.47582 1.74676 5.33274 1.85225 5.22725C1.95774 5.12176 2.10082 5.0625 2.25 5.0625H15.75C15.8992 5.0625 16.0423 5.12176 16.1477 5.22725C16.2532 5.33274 16.3125 5.47582 16.3125 5.625Z" fill="#1A1A1A"/>
  <path d="M15.75 4.5H2.25C1.95163 4.5 1.66548 4.61853 1.4545 4.82951C1.24353 5.04048 1.125 5.32663 1.125 5.625V12.375C1.125 12.6734 1.24353 12.9595 1.4545 13.1705C1.66548 13.3815 1.95163 13.5 2.25 13.5H15.75C16.0484 13.5 16.3345 13.3815 16.5455 13.1705C16.7565 12.9595 16.875 12.6734 16.875 12.375V5.625C16.875 5.32663 16.7565 5.04048 16.5455 4.82951C16.3345 4.61853 16.0484 4.5 15.75 4.5ZM15.75 12.375H2.25V5.625H15.75V12.375ZM14.0625 9C14.0625 9.16688 14.013 9.33001 13.9203 9.46876C13.8276 9.60752 13.6958 9.71566 13.5416 9.77952C13.3875 9.84338 13.2178 9.86009 13.0541 9.82754C12.8905 9.79498 12.7401 9.71462 12.6221 9.59662C12.5041 9.47862 12.4238 9.32828 12.3912 9.16461C12.3587 9.00094 12.3754 8.83129 12.4392 8.67711C12.5031 8.52294 12.6112 8.39116 12.75 8.29845C12.8887 8.20573 13.0519 8.15625 13.2188 8.15625C13.4425 8.15625 13.6571 8.24514 13.8154 8.40338C13.9736 8.56161 14.0625 8.77622 14.0625 9Z" fill="#1A1A1A"/>
</svg>`,
	'Ширина канала (Mbps)': `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
  <path opacity="0.2" d="M14.0625 2.81245V14.0625C14.0625 14.2116 14.0032 14.3547 13.8977 14.4602C13.7923 14.5657 13.6492 14.625 13.5 14.625H2.25C2.13868 14.625 2.02984 14.5921 1.93726 14.5303C1.84468 14.4685 1.77251 14.3806 1.7299 14.2778C1.68729 14.1749 1.67615 14.0618 1.69789 13.9526C1.71963 13.8434 1.77328 13.7432 1.85203 13.6645L13.102 2.41449C13.1807 2.33573 13.281 2.28209 13.3901 2.26034C13.4993 2.2386 13.6125 2.24974 13.7153 2.29235C13.8182 2.33497 13.906 2.40713 13.9678 2.49971C14.0296 2.5923 14.0626 2.70114 14.0625 2.81245Z" fill="#1A1A1A"/>
  <path d="M13.9303 1.77399C13.7248 1.68871 13.4986 1.66631 13.2803 1.70962C13.062 1.75292 12.8615 1.85999 12.7041 2.01727L1.45406 13.2673C1.29679 13.4246 1.18971 13.6251 1.14637 13.8433C1.10303 14.0616 1.12537 14.2877 1.21056 14.4933C1.29575 14.6988 1.43997 14.8745 1.62499 14.998C1.81001 15.1216 2.02751 15.1875 2.25 15.1875H13.5C13.7984 15.1875 14.0845 15.069 14.2955 14.858C14.5065 14.647 14.625 14.3609 14.625 14.0625V2.8125C14.6254 2.58999 14.5595 2.37241 14.4358 2.18746C14.3121 2.00252 14.1361 1.85858 13.9303 1.77399ZM13.5 14.0625H2.25L13.5 2.8125V14.0625Z" fill="#1A1A1A"/>
</svg>`,
	'Купить место для бэкапов': `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
  <path opacity="0.2" d="M15.1875 3.9375V8.06977C15.1875 13.9887 10.1735 15.9497 9.17297 16.2823C9.0609 16.3209 8.9391 16.3209 8.82703 16.2823C7.82648 15.9511 2.8125 13.9922 2.8125 8.07117V3.9375C2.8125 3.78832 2.87176 3.64524 2.97725 3.53975C3.08274 3.43426 3.22582 3.375 3.375 3.375H14.625C14.7742 3.375 14.9173 3.43426 15.0227 3.53975C15.1282 3.64524 15.1875 3.78832 15.1875 3.9375Z" fill="#1A1A1A"/>
  <path d="M5.66508 8.22656C5.69268 8.15788 5.73357 8.09532 5.7854 8.04248C5.83722 7.98963 5.89897 7.94753 5.9671 7.91859C6.03523 7.88966 6.1084 7.87445 6.18242 7.87385C6.25644 7.87324 6.32985 7.88726 6.39844 7.91508L8.4375 8.73141V6.75C8.4375 6.60082 8.49676 6.45774 8.60225 6.35225C8.70774 6.24676 8.85082 6.1875 9 6.1875C9.14918 6.1875 9.29226 6.24676 9.39775 6.35225C9.50324 6.45774 9.5625 6.60082 9.5625 6.75V8.73141L11.6016 7.91508C11.6702 7.88738 11.7436 7.87346 11.8175 7.87412C11.8915 7.87478 11.9647 7.89001 12.0328 7.91894C12.1009 7.94786 12.1626 7.98991 12.2144 8.0427C12.2663 8.09548 12.3072 8.15796 12.3349 8.22656C12.3626 8.29517 12.3765 8.36856 12.3759 8.44254C12.3752 8.51653 12.36 8.58965 12.3311 8.65775C12.3021 8.72585 12.2601 8.78759 12.2073 8.83943C12.1545 8.89128 12.092 8.93222 12.0234 8.95992L9.89227 9.81211L11.1375 11.475C11.227 11.5943 11.2654 11.7444 11.2443 11.892C11.2232 12.0397 11.1443 12.173 11.025 12.2625C10.9057 12.352 10.7556 12.3904 10.608 12.3693C10.4603 12.3482 10.327 12.2693 10.2375 12.15L9 10.4998L7.7625 12.15C7.71818 12.2091 7.66265 12.2589 7.59909 12.2965C7.53553 12.3342 7.46518 12.3589 7.39205 12.3693C7.31892 12.3798 7.24446 12.3757 7.1729 12.3574C7.10134 12.3391 7.03409 12.3068 6.975 12.2625C6.9159 12.2182 6.86612 12.1627 6.82848 12.0991C6.79085 12.0355 6.7661 11.9652 6.75565 11.892C6.74521 11.8189 6.74927 11.7445 6.7676 11.6729C6.78593 11.6013 6.81818 11.5341 6.8625 11.475L8.10984 9.81211L5.97656 8.95992C5.90788 8.93232 5.84532 8.89143 5.79248 8.8396C5.73963 8.78778 5.69753 8.72603 5.66859 8.6579C5.63966 8.58977 5.62445 8.5166 5.62385 8.44258C5.62324 8.36856 5.63725 8.29515 5.66508 8.22656ZM15.75 3.9375V8.06977C15.75 14.3712 10.4189 16.4609 9.35156 16.8159C9.12368 16.8939 8.87632 16.8939 8.64844 16.8159C7.57969 16.4644 2.25 14.3719 2.25 8.07047V3.9375C2.25 3.63913 2.36853 3.35298 2.5795 3.142C2.79048 2.93103 3.07663 2.8125 3.375 2.8125H14.625C14.9234 2.8125 15.2095 2.93103 15.4205 3.142C15.6315 3.35298 15.75 3.63913 15.75 3.9375ZM14.625 3.9375H3.375V8.07117C3.375 13.5907 8.04867 15.4315 9 15.7479C9.96047 15.4273 14.625 13.5851 14.625 8.07117V3.9375Z" fill="#1A1A1A"/>
</svg>`,
	'Количество серверов для заказа': `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
  <path opacity="0.2" d="M15.75 3.9375V14.0625C15.75 14.2117 15.6907 14.3548 15.5852 14.4602C15.4798 14.5657 15.3367 14.625 15.1875 14.625H2.8125C2.66332 14.625 2.52024 14.5657 2.41475 14.4602C2.30926 14.3548 2.25 14.2117 2.25 14.0625V3.9375C2.25 3.78832 2.30926 3.64524 2.41475 3.53975C2.52024 3.43426 2.66332 3.375 2.8125 3.375H15.1875C15.3367 3.375 15.4798 3.43426 15.5852 3.53975C15.6907 3.64524 15.75 3.78832 15.75 3.9375Z" fill="#1A1A1A"/>
  <path d="M12.9375 7.3125V9.5625C12.9375 9.71168 12.8782 9.85476 12.7727 9.96025C12.6673 10.0657 12.5242 10.125 12.375 10.125H6.98273L7.71047 10.852C7.76273 10.9043 7.80419 10.9663 7.83247 11.0346C7.86076 11.1029 7.87531 11.1761 7.87531 11.25C7.87531 11.3239 7.86076 11.3971 7.83247 11.4654C7.80419 11.5337 7.76273 11.5957 7.71047 11.648C7.65821 11.7002 7.59616 11.7417 7.52788 11.77C7.4596 11.7983 7.38641 11.8128 7.3125 11.8128C7.23859 11.8128 7.1654 11.7983 7.09712 11.77C7.02884 11.7417 6.96679 11.7002 6.91453 11.648L5.22703 9.96047C5.17473 9.90823 5.13324 9.84619 5.10494 9.7779C5.07663 9.70962 5.06206 9.63642 5.06206 9.5625C5.06206 9.48858 5.07663 9.41538 5.10494 9.3471C5.13324 9.27881 5.17473 9.21677 5.22703 9.16453L6.91453 7.47703C7.02008 7.37148 7.16323 7.31219 7.3125 7.31219C7.46177 7.31219 7.60492 7.37148 7.71047 7.47703C7.81602 7.58258 7.87531 7.72573 7.87531 7.875C7.87531 8.02427 7.81602 8.16742 7.71047 8.27297L6.98273 9H11.8125V7.3125C11.8125 7.16332 11.8718 7.02024 11.9773 6.91475C12.0827 6.80926 12.2258 6.75 12.375 6.75C12.5242 6.75 12.6673 6.80926 12.7727 6.91475C12.8782 7.02024 12.9375 7.16332 12.9375 7.3125ZM16.3125 3.9375V14.0625C16.3125 14.3609 16.194 14.647 15.983 14.858C15.772 15.069 15.4859 15.1875 15.1875 15.1875H2.8125C2.51413 15.1875 2.22798 15.069 2.017 14.858C1.80603 14.647 1.6875 14.3609 1.6875 14.0625V3.9375C1.6875 3.63913 1.80603 3.35298 2.017 3.142C2.22798 2.93103 2.51413 2.8125 2.8125 2.8125H15.1875C15.4859 2.8125 15.772 2.93103 15.983 3.142C16.194 3.35298 16.3125 3.63913 16.3125 3.9375ZM15.1875 14.0625V3.9375H2.8125V14.0625H15.1875Z" fill="#1A1A1A"/>
</svg>`,
}

const getVPSAddonName = {
	'Оперативная память': `ram`,
	'IPv4-адреса': `ip4`,
	'Количество процессоров': `cpu`,
	'Дисковое пространство': `space`,
	'Ширина канала (Mbps)': `port`,
	'Купить место для бэкапов': `backup`,
}

const getTabsName = {
	'Сеть /64 (18 446 744 073 709 551 616 адресов)': 'Сеть /64',
	'Сеть /125 (8 адресов)': 'Сеть /125',
	'Без панели управления': 'Нет',
}

const getTitle = (name) => {
	return name === 'Купить место для бэкапов'
		? 'Место для резервных копий'
		: name
}

const getMinValue = (name, value) => {
	return name === 'Купить место для бэкапов' ? 0 : +value
}


import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function PasswordInput(props) {
    const {
        isSignup,
        inputPassword,
        setInputPassword,
        isDisabled,
        setRightPassword,
        repeatPassword,
        setRepeatPassword,
    } = props;
    const [showPassword, setShowPassword] = useState(false);

    function togglePassword() {
        setShowPassword(!showPassword);
    }

    function passwordsMatch(newPass) {
        setRepeatPassword(newPass);

        if (inputPassword !== newPass) {
            return setRightPassword(false);
        }
        setRightPassword(true);
    }

    return (
        <>
            <div>
                <input
                    type={showPassword? "text" : "password"}
                    placeholder="password"
                    onChange={(event) => setInputPassword(event.target.value)}
                    value={inputPassword}
                    disabled={isDisabled}
                    minLength={isSignup? "4" : undefined}
                    maxLength={isSignup? "20" : undefined}
                    name="password"
                    required
                />
                <button type="button" onClick={togglePassword}>
                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
            </div>
            {isSignup && 
                <input
                    type={showPassword? "text" : "password"}
                    placeholder="confirm password"
                    id="check-password"
                    onChange={(event) => passwordsMatch(event.target.value)}
                    value={repeatPassword}
                    disabled={isDisabled}
                    required
                />
            }
        </>
    );
}

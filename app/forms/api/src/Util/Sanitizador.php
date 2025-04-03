<?php
class Sanitizador{
    public static function sanitize_recursive(&$data) {
        if (is_array($data)) {
            foreach ($data as &$value) {
                self::sanitize_recursive($value);
            }
        } elseif (is_object($data)) {
            foreach ($data as $key => &$value) {
                self::sanitize_recursive($value);
            }
        } elseif (is_string($data)) {
            $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
        }
    }
}